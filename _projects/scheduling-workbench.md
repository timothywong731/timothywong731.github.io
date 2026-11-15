---
title: "Scheduling Workbench"
date: 2026-11-15
excerpt: "Browser-based classroom scheduling optimiser that fits classes to rooms by capacity, facilities and time restrictions, while minimising rooms used."
language: JavaScript
link: https://timothywong731.github.io/scheduling-workbench/
---

Scheduling Workbench is an interactive room-allocation and timetable-optimisation application that runs entirely in the browser. It schedules classes into suitable rooms and time slots while aiming to leave as many rooms as possible unused for the whole day. The main screen is a colour-coded, room-by-room timetable, with a sidebar for class management, room management and scenario settings.

Classes can have different student numbers, durations, required facilities, acceptable room types and scheduling windows, including morning-only, afternoon-only and fixed times. Rooms have individual capacities, types, facilities and availability. Users can edit both sets directly in the interface, or generate new demonstration scenarios with **Randomise classes** and **Randomise rooms**. Scenarios can be imported and exported as JSON, and a completed timetable can be exported as CSV.

The optimiser is a JavaScript branch-and-bound constraint solver. It searches feasible class–room–start-time combinations, rejects overlapping classes and unsuitable rooms, and minimises the number of rooms used. It distinguishes a feasible result from an optimum that has been proved within the search limit. The responsive application is a standalone HTML page, with no server, installation or internet connection required for local use.

<p class="actions">
  <a href="https://timothywong731.github.io/scheduling-workbench/" class="button" rel="noopener">Open Scheduling Workbench</a>
  <a href="https://github.com/timothywong731/scheduling-workbench" class="button button--quiet" rel="noopener">{% include icon.html name="github" %}<span>Source on GitHub</span></a>
</p>
