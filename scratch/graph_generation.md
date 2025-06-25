# Technical Specification: Iterative Graph Generator (IGG)

## 1. Overview
The **Iterative Graph Generator (IGG)** is a specialized tool designed for autonomous agents to construct knowledge graphs incrementally. Unlike traditional "text-to-graph" batch processes, IGG operates on a **Observe-Reason-Act** loop. It maintains an in-memory graph state, allowing the agent to query the existing structure before deciding on the next addition.

This tool is built for scenarios where the graph structure is complex, recursive, or requires logical deduction (e.g., mapping code dependencies, argument mapping, or complex project planning).

## 2. Architecture & Stack

*   **Runtime Environment:** JVM (Java/Kotlin)
*   **Core Graph Engine:** **Apache TinkerPop (TinkerGraph)**
    *   *Reasoning:* In-memory performance is critical for the tight iterative loop. TinkerGraph provides microsecond latency for traversals.
*   **Query Language:** Gremlin (for internal validation), JSON/Cypher-like DSL (for Agent interaction).
*   **Interface:** REST API or gRPC (depending on platform architecture).

## 3. Configuration & Input Schema
The configuration has been restructured to be strictly typed, preventing agent "hallucinations" regarding node types and ensuring resource bounds.

### 3.1 Input Payload
```json
{
  "session_id": "uuid-1234",
  "goal_prompt": "Map out the dependencies of the authentication module based on the provided source files.",
  "context_data": "...", // The raw text/code/data the agent is analyzing
  "config": {
    "max_iterations": 20,
    "constraints": {
      "max_nodes": 50,
      "max_edges": 100,
      "allow_self_loops": false
    },
    "schema": {
      "node_types": ["Class", "Interface", "Method", "DatabaseTable"],
      "edge_types": ["CALLS", "IMPLEMENTS", "READS_FROM", "WRITES_TO"],
      "required_attributes": {
        "Class": ["name", "package"],
        "Method": ["name", "signature"]
      }
    }
  }
}
```

## 4. Operational Workflow
The tool executes a state machine loop.

### Phase 1: Initialization
1.  Initialize `TinkerGraph` instance.
2.  Load `schema` definitions into a validation layer.
3.  (Optional) Load `seed_data` if the graph should start partially populated.

### Phase 2: The Generation Loop
The loop continues until `max_iterations` is reached, constraints are met, or the Agent signals completion.

#### Step 2.1: State Serialization (The "Observe" Step)
The tool generates a context-aware snapshot of the graph to send to the Agent (LLM).
*   *Strategy:* If the graph is small (<50 nodes), serialize the whole graph to a simplified format (e.g., Markdown or GraphML).
*   *Strategy:* If large, provide a summary (node counts) and allow the agent to request specific sub-graph traversals in the next step.

#### Step 2.2: Agent Decision (The "Reason" Step)
The tool invokes the Agent (LLM) with:
1.  `goal_prompt`
2.  `context_data`
3.  `current_graph_state`
4.  `schema_definitions`

**Agent Output Expectation:**
The Agent must return a structured JSON action list.

```json
{
  "reasoning": "I have added the AuthController. Now I need to add the AuthService it depends on.",
  "actions": [
    {
      "type": "ADD_NODE",
      "label": "Class",
      "properties": { "name": "AuthService", "package": "com.app.auth" }
    },
    {
      "type": "ADD_EDGE",
      "label": "CALLS",
      "from": { "name": "AuthController" }, // Reference by unique property
      "to": { "name": "AuthService" }
    }
  ]
}
```

#### Step 2.3: Execution & Validation (The "Act" Step)
The IGG tool processes the `actions` list:
1.  **Schema Check:** Does `AuthService` match `node_types`? Are required attributes present?
2.  **Constraint Check:** Will this exceed `max_nodes`?
3.  **Graph Mutation:**
    *   Execute `g.addV(...)` or `g.addE(...)`.
    *   *Error Handling:* If a "from" node for an edge doesn't exist, log a warning and skip that specific action (do not crash the loop).

### Phase 3: Finalization
1.  **Pruning (Optional):** Remove isolated nodes if configured.
2.  **Export:** Serialize the final `TinkerGraph` object to the requested format (GraphML, JSON, or push to a persistent Neo4j instance).

## 5. Java Implementation Specs

### 5.1 Core Class Structure

```java
public class GraphGenerationService {
    private final Graph graph;
    private final GraphTraversalSource g;
    private final GraphSchema schema;
    private final Constraints constraints;

    public GraphGenerationService(GraphConfig config) {
        this.graph = TinkerGraph.open();
        this.g = graph.traversal();
        this.schema = config.getSchema();
        this.constraints = config.getConstraints();
    }

    public GenerationResult executeLoop(AgentInterface agent, String context) {
        int iteration = 0;
        while (iteration < constraints.getMaxIterations()) {
            // 1. Serialize State
            String graphView = GraphSerializer.toMarkdown(g);

            // 2. Call Agent
            AgentResponse response = agent.decide(context, graphView, schema);

            // 3. Stop condition
            if (response.isFinished()) break;

            // 4. Apply Actions
            applyActions(response.getActions());

            // 5. Check Constraints
            if (checkLimitsReached()) break;

            iteration++;
        }
        return new GenerationResult(graph);
    }

    private void applyActions(List<GraphAction> actions) {
        // Implementation of addV/addE with schema validation
        // Uses try-catch to ensure robustness
    }
}
```

### 5.2 Schema Validation Logic
The tool must enforce the schema strictly to ensure the resulting graph is queryable by other tools in the platform.

*   **Strict Mode:** If the agent tries to add a `node_type` not in the config, the action is rejected, and an error feedback loop is provided to the agent in the next iteration.
*   **Soft Mode:** The tool automatically adds the new type to the schema (useful for exploratory sessions).

## 6. Observability & Logging
Since this is an autonomous process, detailed logging is required for debugging "why" the graph looks the way it does.

*   **Iteration Log:** A JSON log file recording every step:
    *   `Iteration N`:
        *   `Graph State`: (Summary)
        *   `Agent Reasoning`: "..."
        *   `Actions Taken`: [...]
        *   `Errors`: ["Node 'X' not found for edge creation"]

## 7. Future Extensibility
*   **Persistent Backend:** Abstract the `Graph` interface so `TinkerGraph` can be swapped for `JanusGraph` for graphs exceeding memory limits.
*   **Vector Integration:** Add embeddings to nodes as they are created to allow for semantic searching of the graph during the generation process.
