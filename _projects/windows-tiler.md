---
title: "Windows Tiler"
date: 2026-09-06
excerpt: "Right-click a Windows 11 taskbar group to tile its windows on one monitor or across all of them, with undo."
language: "C#"
link: https://github.com/timothywong731/windows-tiler
---

Windows Tiler is a small Windows 11 utility for arranging the windows of one taskbar application. Right-click a running app's taskbar button, and the menu gains a "Windows Tiler" submenu: tile on this monitor, tile across all monitors, or undo the last tiling. It acts only on the windows in the group you clicked, never on every window from the same process, so two browser groups stay independent.

It runs as two processes. A native C++ bridge, written as a Windhawk mod, hooks the taskbar's context menu to add the submenu and collect the group's window handles. When you pick a command, it starts a short-lived .NET 8 helper, so .NET is never loaded into Explorer. The helper is per-monitor DPI aware and calls Win32 directly. Before tiling, it skips hidden, cloaked, fixed-size, hung and other-desktop windows, and reads each window's minimum size.

The layout engine is plain C#, kept apart from the Win32 code. It tries every row count, splits each monitor's work area on whole pixels, and picks the grid whose cells come closest to 16:10 while respecting every window's minimum size. Tiling is treated as a transaction. An undo snapshot is written to disk before any window moves, and a failed move rolls the rest back. Undo restores each window's original placement, including minimised and maximised state.

It ships as a per-user MSI with a self-contained .NET runtime. A GitHub Actions workflow tests installation, repair, upgrade and uninstall on Windows Server 2025. The README describes the taskbar integration as experimental.

<p class="actions">
  <a href="https://github.com/timothywong731/windows-tiler" class="button" rel="noopener">{% include icon.html name="github" %}<span>View on GitHub</span></a>
</p>
