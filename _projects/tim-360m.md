---
title: "TIM-360M"
seo_title: "TIM-360M: a small language model trained from scratch by Timothy Wong"
date: 2026-07-14
excerpt: "A 360M-parameter language model trained from scratch on two consumer GPUs."
thumbnail: /images/projects/tim-360m.jpg
language: Python
og_image: "tim-360m-hero.png"
---

![TIM-360M: Small model. Big possibilities.](/images/tim-360m-hero.png)

**TIM (Transformer Inference Model)** is a small language model (SLM) built from scratch by Tim. The project covers every stage: data sourcing, tokenisation, pretraining, post-training, and evaluation. Training and inference run on consumer grade hardware. No cloud training cluster is involved.

<p class="actions">
  <a href="https://huggingface.co/timothywong731/tim-360m-instruct-GGUF" class="button" rel="noopener">{% include icon.html name="huggingface" %}<span>Download from Hugging Face</span></a>
  <a href="https://ollama.com/timothywong731/tim-360m-instruct" class="button button--quiet" rel="noopener">{% include icon.html name="ollama" %}<span>Run on Ollama</span></a>
</p>

## Why build a model from scratch?

Most practitioners fine-tune existing models. TIM goes further. It implements a modern decoder-only transformer from first principles, trains its own tokeniser, curates a multi-source corpus, and pretrains with a competitive small-model recipe, all within the limits of consumer grade GPUs. The result is a fully owned model family under the Apache 2.0 licence, where every design decision is documented and reproducible.

## Why small models matter

Large models get the headlines, but small models do much of the real work. A model with a few hundred million parameters fits on a laptop, a phone or a single office server, and for many focused tasks that is all you need.

- **Smart, efficient and focused.** A small model tuned for a specific job can match a far larger general model on that job. Inference is rapid, even on edge devices and modest hardware.
- **Private by design.** Small models can be trained and fine-tuned on internal data. The entire workflow can be deployed entirely on premise. Your data never leaves your network, which matters in regulated industries such as energy, finance and government.
- **Fast, local and yours.** Responses arrive with low latency, there are no per-token API bills, and everything works offline. You hold the weights, so the model can never be withdrawn, altered or priced out from under you.
- **Cheap to run.** A small model draws a fraction of the power and cost of a large one. That makes it practical to serve many users, run continuously, or embed in products where a large model would never fit the budget.

## Model at a glance

| Specification | Detail |
| --- | --- |
| **Size** | 360 million parameters |
| **Type** | Decoder-only transformer with a custom tokeniser |
| **Training data** | About 50 billion tokens of high-quality web, code and maths text |
| **Post-training** | Tuned to follow instructions and chat |
| **Runs on** | Everyday hardware, fully offline if needed |
| **Licence** | Apache 2.0, free for commercial use |

## Trained on consumer-grade hardware

The whole pipeline runs on one Windows 11 workstation (training in WSL2):

| Component | Spec |
| --- | --- |
| GPU | 2 NVIDIA RTX 4090 cards (24 GB each, no NVLink; DDP over PCIe) |
| CPU | AMD Ryzen Threadripper PRO 7965WX (24 cores) |
| RAM | 128 GB DDR5 |
| Storage | Local NVMe for hot tokenised shards; network storage for raw corpora |

These limits shaped every engineering decision: the 24 GB ceiling per GPU, the PCIe-only interconnect, and a hobbyist's calendar. They led to a pretraining window of roughly two weeks.

## Available models

| Model | Description |
| --- | --- |
| [tim-360m-base](https://huggingface.co/timothywong731/tim-360m-base) | Pretrained base model |
| [tim-360m-instruct](https://huggingface.co/timothywong731/tim-360m-instruct) | Chat and assistant model (SFT, then DPO) |
| [tim-360m-base-GGUF](https://huggingface.co/timothywong731/tim-360m-base-GGUF) | Quantised base model for local inference |
| [tim-360m-instruct-GGUF](https://huggingface.co/timothywong731/tim-360m-instruct-GGUF) | Quantised instruct model for local inference |
