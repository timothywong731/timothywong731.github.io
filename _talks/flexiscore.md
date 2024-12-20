---
title: "Parallelised Time Series Spike Detection using R on the Hadoop Platform"
collection: talks
type: "Poster"
permalink: /talks/user2017
venue: "The Conference for Users of R (useR!) 2017"
date: 2017-07-04
location: "Brussels, Belgium"
---

Smart meters records continuous stream of electricity consumption for each and every supply point across the United Kingdom. Energy suppliers are interested in understanding customer's consumption pattern in order to provide better service for them. **FlexiScore (F)** is a new concept which British Gas has developed. It is a single numeric value ranging between 0 and 1 which quantifies the amount of flexible energy load for each electric supply points. High *F* value suggests the presence of erratic spikes, while low *F* value indicates prolonged consistency and non-spiky behaviour. The algorithm has been productionised on the Hadoop platform (on premise) using Microsoft R Server 8.0 as a fully-scalable analytics framework. The large-scale distributed process contains an array of Markov Chains Monte Carlo (MCMC) for missing data permutation. A layer of Fourier transformation has been applied to create seasonal time series model. Afterwards, simple heuristics is applied to isolate erratic consumption spikes. The *F* score is then computed as output alongside other descriptive statistics.

Poster can be downloaded [here](../files/brussels.pdf).
