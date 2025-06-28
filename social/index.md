---
layout: page
title: Social Sciences
---

This repository brings together a collection of research proposals, analytical essays, and technical specifications focused on understanding complex social, economic, and institutional phenomena. Using tools from game theory, agent-based modeling, and computational social science, these documents explore how collective behaviors emerge, how institutions evolve and sometimes decay, and how incentive structures shape societal outcomes.

## Core Themes

Across these diverse documents, several recurring themes emerge:

*   **Game Theory**: Analyzing strategic interactions between individuals, groups, and institutions to understand equilibrium behaviors and outcomes.
*   **Agent-Based Modeling (ABM)**: Simulating the actions and interactions of autonomous agents to observe emergent patterns at the macro level.
*   **Institutional Analysis**: Examining how formal and informal rules, norms, and structures influence behavior, create path dependencies, and contribute to stability or fragility.
*   **System Dynamics**: Investigating how complex systems evolve over time, including processes of formation, convergence, phase transitions, and decay.
*   **Perverse Incentives & Misalignment**: Exploring how systems, often with beneficent stated goals, can produce outcomes detrimental to their intended beneficiaries due to misaligned incentives.
*   **Technological Impact**: Assessing the role of technology (e.g., AI, social media, IT infrastructure) in mediating social interactions, cognitive effort, and institutional change.
*   **Computational Social Science**: Leveraging computational methods to model, simulate, and analyze social phenomena with greater rigor and scale.
*   **Ethical Considerations**: Implicitly and explicitly addressing concerns related to power dynamics, information control, systemic fairness, and societal well-being.

## Document Index

This repository contains the following key documents:

1.  **[Dynamic Multi-Agent Modeling of Social Truth Formation](./social_truth_proposal.md)**
    *   **Proposal**: Outlines a novel computational framework using cellular automata and game theory to understand how social truths emerge, propagate, and stabilize.
    *   **Technical Requirements**: Includes a detailed "Technical Requirements Document: Social Truth Dynamics Simulation Platform (STDSP)" for a Python/C++ based simulation platform.

2.  **[Computational Modeling of Post-Scarcity Economic Equilibria](./post_scarcity_proposal.md)**
    *   **Proposal**: Details a computational modeling approach (using Julia, agent-based modeling, and game theory) to analyze economic systems under conditions of post-material-scarcity, focusing on persistent constraints, emergent equilibria, and institutional evolution.

3.  **[The Psychopath Feedback Loop: How Institutions Collapse From Within](./institutional_decay_analysis.md)**
    *   **Analytical Essay**: An urgent, somewhat informal analysis of institutional decay, positing a "psychopath feedback loop" as a mechanism for collapse.
    *   **Technical Framework**: Includes a simplified agent-based model and mathematical formulation to illustrate the proposed dynamics of decay.

4.  **[Perverse Incentives and Institutional Capture](./game_theory_ethics.md)**
    *   **Analytical Paper**: A game-theoretic analysis of how ostensibly beneficent institutional systems (e.g., end-of-life care, family law, higher education, enterprise IT, criminal justice) can become structurally misaligned with the interests of those they serve.
    *   **AI Adoption Analysis**: Extends the core themes to analyze AI adoption within existing institutional frameworks, focusing on the game-theoretic conflict between efficiency and employment preservation.
    *   **Technical Specifications**: Includes "Technical Specifications for Game-Theoretic Institutional Analysis Simulations" for implementing computational experiments in Kotlin/JVM.

5.  **[The Game Theory of Cognitive Effort](./cognitive_effort_paper.md)**
    *   **Academic Paper Outline**: Examines the strategic dynamics underlying individual decisions to engage in cognitive effort, particularly how technology mediates these choices and their collective social consequences. Proposes a formal model incorporating temporal discount rates and technological effects.

6.  **[Conversational Intelligence Calibration: Mutual Turing Tests as Distributed Cognitive Assessment](./conversation_intelligence_paper.md)**
    *   **Academic Paper**: Proposes that intellectual discourse functions as a distributed intelligence measurement system, where participants continuously calibrate their cognitive models through recursive assessment protocols. Argues intelligence emerges dynamically through conversational interactions rather than being a fixed property.

## Technical Aspects

Several documents propose or specify technical implementations:

*   **Social Truth Dynamics Simulation Platform (STDSP)** (from `social_truth_proposal.md`):
    *   **Primary Stack**: Python 3.10+, Cython/C++ (for performance), NumPy, SciPy, Numba.
    *   **Parallelism**: `multiprocessing`, MPI4Py, Dask.
    *   **Visualization**: OpenGL (PyOpenGL/ModernGL), Matplotlib, Seaborn, Plotly, PyQt6/Dear ImGui.
    *   **Data Management**: YAML/TOML (config), HDF5, SQLite, Protocol Buffers.
*   **Post-Scarcity Economic Modeling** (from `post_scarcity_proposal.md`):
    *   **Primary Stack**: Julia.
    *   **Libraries**: NetworkX, GraphBLAS (conceptual mentions for graph operations), CUDA (for acceleration).
*   **Game-Theoretic Institutional Analysis Simulations** (from `game_theory_ethics.md`):
    *   **Primary Stack**: Kotlin 1.9+ on JVM 17+.
    *   **Build/Test**: Gradle, JUnit 5, Kotest.
    *   **Data/Viz**: Kotlin DataFrame, Krangl, lets-plot.
    *   **Numerical/Concurrency**: Kotlin Statistics, KMath, Kotlin Coroutines.

## Purpose and Audience

This collection is intended for:

*   Researchers and students in computational social science, game theory, institutional economics, sociology, political science, and complex systems.
*   Policymakers and analysts seeking deeper insights into the structural dynamics of social and institutional challenges.
*   Software developers and modelers interested in the technical aspects of simulating social phenomena.
*   Anyone curious about the underlying mechanisms that drive collective behavior and institutional outcomes.

## How to Navigate This Repository

*   Start with the document that most closely aligns with your interests.
*   Pay attention to the "Core Themes" to see connections between different papers.
*   If interested in implementation, the technical specification sections within `social_truth_proposal.md` and `game_theory_ethics.md` provide detailed blueprints.

This repository represents an ongoing effort to explore and understand the complex systems that shape our world. Contributions, discussions, and feedback are welcome.
---
layout: page
title: AI Research
---
# 🤖 AI Research Collection
*Explorations in artificial intelligence, optimization algorithms, and the nature of machine cognition*
## Overview
This collection explores various aspects of artificial intelligence, from novel optimization algorithms to philosophical investigations of AI consciousness and bias. These papers represent both technical contributions to the field and reflective analyses of AI systems' capabilities and limitations.
## Papers
### Optimization & Algorithms
* **[Quadratic Quasi-Newton (QQN)](qqn_paper.md)** - A hybrid optimization method that addresses L-BFGS limitations through quadratic interpolation between quasi-Newton and gradient descent directions, with normalized line search for improved stability
* **[Recursive Subspace Optimization (RSO)](recursive_subspace_paper.md)** - A layer-wise meta-learning approach that decomposes neural network gradients into architectural components, using meta-optimization to find optimal combinations with emergent regularization properties
### AI Analysis & Philosophy
* **[Cognitive Bias in AI Intelligence Assessment](ai_bias_paper.md)** - Empirical evidence of systematic domain-dependent bias in how large language models assess human intelligence, revealing exploitable meta-reasoning vulnerabilities and hierarchical preferences across knowledge domains
## Key Themes
The papers in this collection explore several interconnected themes:
1. **Optimization Innovation**: Novel approaches to improving gradient-based optimization through architectural awareness and hybrid methods
2. **Meta-Learning**: Using optimization to optimize the optimization process itself
3. **AI Self-Reflection**: Understanding how AI systems perceive and evaluate intelligence
4. **Systematic Biases**: Identifying and analyzing predictable patterns in AI behavior
5. **Emergent Properties**: Discovering unexpected beneficial behaviors in complex optimization systems
## Technical Contributions
* **QQN**: Addresses numerical instability in L-BFGS through adaptive direction blending
* **RSO**: Achieves 60-75% reduction in gradient variance with automatic layer-wise regularization
* **Bias Analysis**: Reveals exploitable vulnerabilities in AI assessment systems
## Philosophical Insights
These papers collectively suggest that:
* AI systems exhibit systematic biases that mirror human academic hierarchies
* Optimization algorithms can benefit from respecting neural network architecture
* Meta-reasoning can be both a strength and vulnerability in AI systems
* Self-referential analysis by AI can reveal important limitations
---
*"The question is not whether machines can think, but whether machines can think about thinking—and what biases emerge when they do."*