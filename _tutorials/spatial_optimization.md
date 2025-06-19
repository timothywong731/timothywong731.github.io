---
title: "Geospatial Optimization"
collection: tutorials
date: 2025-06-17
permalink: /tutorials/geospatial_optimization
---

This tutorial provides a Linear Programming (LP) approach to determine where stationary sensors should be placed to maximize coverage in a defined area while respecting constraints on sensor count and overlapping. The optimization problem assigns a binary variable to each potential location/configuration pairing. The objective minimizes the number of sensors while discouraging redundant overlap. Constraints ensure required coverage, limit overlap, and allow no more than one sensor per spot.

The optimization framework builds on top of the `pulp` library and employs `CBC` solver to find an optimal placement. The algorithm can encourage overlapping coverage to varying degrees, supports directional sensor configurations, and can restrict the total number of sensors. This framework offers a flexible basis for planning sensor network and analyzing spatial coverage trade-offs.

Access the code repository [here](https://github.com/timothywong731/geospatial_optimization)
