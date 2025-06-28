---
layout: page
title: AI Research
---

*Explorations in artificial intelligence, optimization algorithms, and the nature of machine cognition*

## Overview

This collection explores various aspects of artificial intelligence, from novel optimization algorithms to philosophical
investigations of AI consciousness and bias. These papers represent both technical contributions to the field and
reflective analyses of AI systems' capabilities and limitations.

## Papers

### Optimization & Algorithms

* **[Quadratic Quasi-Newton (QQN)](qqn_paper.md)** - A hybrid optimization method that addresses L-BFGS limitations
  through quadratic interpolation between quasi-Newton and gradient descent directions, with normalized line search for
  improved stability
* **[Recursive Subspace Optimization (RSO)](recursive_subspace_paper.md)** - A layer-wise meta-learning approach that
  decomposes neural network gradients into architectural components, using meta-optimization to find optimal
  combinations with emergent regularization properties
* **[PromptOptimization](prompt_optimization.md)** - A genetic algorithm framework for automated prompt engineering in large language models, evolving system prompts through mutation and recombination
* **[Trust Region Methods](trust_regions.md)** - A comprehensive software framework for implementing trust region methods in neural network optimization with various constraint strategies

### AI Analysis & Philosophy

* **[Cognitive Bias in AI Intelligence Assessment](ai_bias_paper.md)** - Empirical evidence of systematic
  domain-dependent bias in how large language models assess human intelligence, revealing exploitable meta-reasoning
  vulnerabilities and hierarchical preferences across knowledge domains

## Key Themes

The papers in this collection explore several interconnected themes:

1. **Optimization Innovation**: Novel approaches to improving gradient-based optimization through architectural
   awareness and hybrid methods
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
*"The question is not whether machines can think, but whether machines can think about thinking—and what biases emerge
when they do."*