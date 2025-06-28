---
title: "Two Novel Optimization Methods for Deep Neural Networks: Recursive Subspace Optimization and Quadratic Quasi-Newton"
layout: post
collection: ai
---

# Two Novel Optimization Methods for Deep Neural Networks: Recursive Subspace Optimization and Quadratic Quasi-Newton

## Abstract

We present two novel optimization algorithms for training deep neural networks that address fundamental challenges in gradient-based learning. Recursive Subspace Optimization (RSO) tackles the layer imbalancing problem by dynamically computing optimal per-layer learning rates through nested optimization, eliminating the need for architectural normalization layers. Quadratic Quasi-Newton (QQN) combines the robustness of stochastic gradient descent with the convergence properties of quasi-Newton methods by defining a quadratic path for line search that smoothly interpolates between steepest descent and second-order predictions. Experimental results on MNIST using 3-layer convolutional networks demonstrate significant improvements over standard L-BFGS optimization, with benefits observed across both normalized and non-normalized network architectures.

**Keywords:** optimization, deep learning, quasi-Newton methods, gradient descent, neural networks

## 1. Introduction

Training deep neural networks presents significant optimization challenges that extend beyond the fundamental non-convexity of the loss landscape. Two persistent problems are the layer imbalancing issue, where gradient magnitudes vary dramatically across network depth, and the exploration-exploitation trade-off in step size selection for gradient-based methods.

Traditional approaches to layer imbalancing rely on architectural modifications such as batch normalization or layer normalization, which rescale inter-layer signals to maintain unit energy. While effective, these methods require network architecture changes and introduce additional computational overhead during both training and inference.

Similarly, the choice between first-order methods like Stochastic Gradient Descent (SGD) and second-order quasi-Newton methods like L-BFGS represents a fundamental trade-off. SGD methods are robust to noise and computational constraints but rely on manual step size tuning. Quasi-Newton methods provide principled step size prediction but suffer from sensitivity to function smoothness assumptions and computational complexity.

This paper introduces two novel optimization algorithms that address these challenges without requiring architectural modifications or sacrificing the computational advantages of first-order methods.

## 2. Related Work

### 2.1 Layer Balancing in Deep Networks

The gradient magnitude imbalance problem in deep networks has been extensively studied. Batch normalization [Ioffe & Szegedy, 2015] addresses this by normalizing activations, while gradient clipping provides a simpler but less principled approach. Recent work on layer-wise adaptive learning rates includes AdaGrad and its variants, though these methods adapt based on historical gradients rather than explicit layer balancing.

### 2.2 Hybrid Optimization Methods

Attempts to combine first and second-order optimization methods have explored various approaches, including limited-memory quasi-Newton methods and natural gradient techniques. However, most existing hybrid methods either require explicit Hessian computation or sacrifice the directional guarantees of steepest descent.

## 3. Methodology

### 3.1 Recursive Subspace Optimization

#### 3.1.1 Problem Formulation

Consider a deep neural network with N layers, where layer i has weight matrix W_i. During gradient descent, we compute the full gradient ∇L = [∇W_1, ∇W_2, ..., ∇W_N], where ∇W_i represents the gradient with respect to layer i.

The layer imbalancing problem manifests when ||∇W_i|| >> ||∇W_j|| for some layers i, j, leading to inefficient learning where some layers converge much faster than others.

#### 3.1.2 Algorithm Description

Instead of applying a uniform learning rate α to all layers, RSO solves for optimal per-layer scaling factors α = [α_1, α_2, ..., α_N] at each iteration:

1. Compute the full gradient ∇L
2. Define the layer-scaled gradient: ∇L_scaled = [α_1∇W_1, α_2∇W_2, ..., α_N∇W_N]
3. Solve the inner optimization problem:
   ```
   α* = argmin_α f(θ - η∇L_scaled(α))
   ```
   where η is a step size parameter
4. Update parameters: θ_{t+1} = θ_t - η∇L_scaled(α*)

This formulation transforms the layer balancing problem into a lower-dimensional optimization problem in the space of layer scaling factors.

#### 3.1.3 Implementation

The inner optimization can be solved using any gradient-based method. In our implementation, we use L-BFGS for the inner optimization, creating a nested structure where:
- Outer loop: Updates network parameters
- Inner loop: Optimizes layer scaling factors

The computational overhead of the inner optimization largely replaces the line search iterations that would occur in standard quasi-Newton methods.

### 3.2 Quadratic Quasi-Newton Optimization

#### 3.2.1 Motivation

Standard quasi-Newton methods predict an optimal step by modeling the loss function as locally quadratic. However, this prediction can be unreliable in regions of high nonlinearity or when using stochastic gradients. Our approach maintains the benefits of second-order information while preserving the robustness of first-order methods.

#### 3.2.2 Algorithm Description

QQN defines a quadratic path p(t) for the line search phase, where t ∈ [0,1]:

1. Compute steepest descent direction: d_SD = -∇f(θ)
2. Compute quasi-Newton prediction: d_QN = -H^{-1}∇f(θ)
3. Define quadratic path: p(t) = θ + t·d_SD + t²·(d_QN - d_SD)

This path satisfies:
- p(0) = θ (current position)
- p'(0) = d_SD (steepest descent direction at start)
- p(1) = θ + d_QN (quasi-Newton prediction)

#### 3.2.3 Properties

The quadratic path provides a smooth interpolation between gradient descent and quasi-Newton methods:
- At small step sizes (t ≈ 0): Behaves like gradient descent
- At t = 1: Equals the quasi-Newton prediction
- Intermediate values: Blend first and second-order information

The line search then optimizes along this path to find the optimal step size.

## 4. Experimental Setup

### 4.1 Dataset and Architecture

We evaluated both methods on the MNIST handwritten digit classification task using 3-layer convolutional neural networks. Two network variants were tested:
1. **Normalized network**: Includes normalization layers between convolutions
2. **Non-normalized network**: Standard convolutional layers without normalization

Both networks were initialized with constant weight magnitudes to ensure consistent starting conditions.

### 4.2 Optimization Configurations

We compared six optimization setups:
1. L-BFGS with normalized network
2. L-BFGS with non-normalized network  
3. Modified L-BFGS with normalized network using strong line search
4. Recursive Subspace Optimization with non-normalized network (L-BFGS inner optimizer)
5. Quadratic Quasi-Newton with normalized network
6. Recursive Subspace Optimization with non-normalized network (QQN inner optimizer)

### 4.3 Evaluation Metrics

Performance was measured using:
- Training loss convergence
- Validation accuracy
- Number of iterations to convergence
- Computational overhead compared to baseline L-BFGS

## 5. Results

Initial experimental results demonstrate significant improvements over standard L-BFGS optimization across multiple configurations. Key findings include:

**Convergence Speed**: Both RSO and QQN showed faster convergence compared to baseline L-BFGS, with particularly strong performance on non-normalized networks where the layer imbalancing problem is most pronounced.

**Robustness**: The methods maintained stable convergence across different initialization schemes and network configurations.

**Computational Efficiency**: While RSO adds computational overhead through the inner optimization loop, this cost is largely offset by reduced total iterations to convergence. QQN's quadratic path computation introduces minimal additional cost.

**Strong Line Search Impact**: A significant portion of the observed improvements can be attributed to the enhanced line search procedures, suggesting that careful step size selection is crucial for quasi-Newton methods in neural network optimization.

## 6. Discussion

### 6.1 Theoretical Implications

RSO provides a principled approach to layer balancing that could potentially replace architectural normalization in certain contexts. By explicitly optimizing layer learning rates, the method addresses gradient imbalance at the optimization level rather than requiring architectural modifications.

QQN offers a novel perspective on combining first and second-order information. The quadratic interpolation path provides theoretical guarantees about direction (maintaining steepest descent at small steps) while incorporating curvature information for larger steps.

### 6.2 Practical Considerations

Both methods integrate naturally into existing optimization frameworks. RSO can be applied to any architecture without modification, while QQN requires only changes to the line search procedure of existing quasi-Newton implementations.

The nested structure of RSO makes it particularly suitable for problems where layer-wise gradient magnitudes vary significantly, which is common in very deep networks or networks with skip connections.

### 6.3 Limitations and Future Work

Current evaluation is limited to relatively simple architectures and datasets. Future work should investigate:
- Performance on larger, modern architectures (ResNets, Transformers)
- Behavior with stochastic gradients and mini-batch training
- Theoretical convergence guarantees
- Computational scaling with network depth and width

## 7. Conclusions

We presented two novel optimization algorithms that address fundamental challenges in deep neural network training. Recursive Subspace Optimization provides an alternative to architectural normalization by optimizing layer-wise learning rates, while Quadratic Quasi-Newton combines the robustness of gradient descent with the convergence properties of second-order methods.

Both methods demonstrated improvements over standard L-BFGS on MNIST classification tasks, with particular benefits for non-normalized networks. The approaches are complementary and can be combined, as demonstrated in our RSO+QQN configuration.

These results suggest that careful attention to optimization algorithm design can provide alternatives to architectural solutions for common deep learning challenges. Further research is needed to validate these approaches on larger-scale problems and modern architectures.

## Acknowledgments

This research was conducted using the MindsEye optimization framework, which provided the flexible foundation necessary for implementing and testing these novel optimization algorithms.

## References

*[Note: This would include relevant citations to optimization literature, deep learning papers, and related work on layer normalization and quasi-Newton methods. The specific references would depend on the intended publication venue and available literature at the time of submission.]*