---
title: "Video Transcription"
date: 2025-07-06
excerpt: "Turns a video into timed SRT subtitles with Whisper, then translates them into English with Meta's NLLB-200."
thumbnail: /images/projects/video-transcription.jpg
language: Python
link: https://github.com/timothywong731/video_transcription
---

Video Transcription is a small Python package for subtitling video. It extracts the audio track, transcribes the speech into a timed SRT file, and can then translate that file into English. The default source language is Japanese, so out of the box it makes English subtitles for Japanese video.

Each step is a separate function. MoviePy, which uses ffmpeg, extracts and re-encodes the audio. OpenAI's Whisper transcribes it, and Tim writes each Whisper segment to SRT himself, including the `HH:MM:SS,mmm` timestamps.

Translation uses Meta's `nllb-200-distilled-600M` model through Hugging Face Transformers, and the larger 3.3B model can be swapped in on a bigger GPU. Subtitles are translated in batches of ten lines, and each line keeps its original start and end times, so the English stays in sync with the picture. Both models use a CUDA GPU when there is one and fall back to the CPU otherwise.

<p class="actions">
  <a href="https://github.com/timothywong731/video_transcription" class="button" rel="noopener">{% include icon.html name="github" %}<span>View on GitHub</span></a>
</p>
