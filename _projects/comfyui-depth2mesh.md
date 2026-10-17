---
title: "ComfyUI Depth2Mesh"
date: 2024-11-04
excerpt: "ComfyUI nodes that turn a depth map into a watertight, millimetre-scaled STL relief for CNC milling or 3D printing."
thumbnail: /images/projects/comfyui-depth2mesh.jpg
language: Python
link: https://github.com/timothywong731/ComfyUI-Depth2Mesh
---

ComfyUI Depth2Mesh is a set of custom ComfyUI nodes that turn a greyscale depth map into a closed 3D mesh and save it as an STL file. Tim started it in November 2024 as a Python script for turning depth maps into meshes for CNC milling. Some of his CNC wood carving is in the [gallery]({{ '/gallery/' | relative_url }}). In February 2026 he rebuilt it as a node pack, so one workflow goes from a source image to a relief ready for machining. DepthAnythingV2 estimates depth from the image. Depth Map to Mesh then builds the geometry at a physical size in millimetres, and further nodes simplify the mesh, render a preview and save the STL.

Every pixel inside the image's alpha mask becomes a vertex, and every 2×2 block of pixels becomes two triangles. The base is a flattened copy of the surface with its winding reversed, and the outline edges are extruded down to form the walls. The result is a watertight solid, even for irregular outlines or several separate pieces. Transparent pixels are left out, so a live-edge plaque can be cut to its outline straight from a transparent PNG.

In July 2026 Tim moved the pipeline from 8-bit to float32 depth, which removed visible terracing on carved surfaces. At the same time he added optional bicubic upscaling and edge-aware smoothing, and rewrote the meshing as vectorised NumPy to handle the larger meshes. The core function also works as a plain Python library. It has 33 pytest tests covering watertightness, holes, normals, precision and the smoothing options, and is released under the MIT licence.

<p class="actions">
  <a href="https://github.com/timothywong731/ComfyUI-Depth2Mesh" class="button" rel="noopener">{% include icon.html name="github" %}<span>View on GitHub</span></a>
</p>
