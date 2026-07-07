### 📄 智能文档解析（面向大模型）
> _为大模型时代将杂乱的文档视觉信息转化为结构化数据。_
- **SOTA 级文档视觉语言模型 (VLM)**: 业界领先的轻量级文档解析视觉语言模型 **PaddleOCR-VL-1.6 (0.9B)**。该模型以 96.3% 精度刷新 OmniDocBench v1.6，文本、公式、表格识别全面领先，并在古籍、生僻字、印章、图表等多场景能力显著增强，支持以 **Markdown** 和 **JSON** 格式输出结构化结果。
- **版面结构分析**：由 **PP-StructureV3** 驱动，无缝将复杂的 PDF文档 和图像转换为 **Markdown** 或 **JSON** 格式。与 PaddleOCR-VL 系列模型不同，它提供更细粒度的坐标信息，包括表格单元格坐标、文本坐标等。
- **生产级高效能**：以极小的模型体积实现商业级别的准确率。

### ⚛️实现原理
PaddleOCR-VL 整体由版面分析与 VLM 识别两个核心阶段组成。下图展示了一个简化的流程：
![](https://raw.githubusercontent.com/cuicheng01/PaddleX_doc_images/5f2c42665e6a97d5726fe553241acd79361159a0/images/paddleocr_vl_1_5/process_step_ZH.png)
**第一阶段为版面分析：**
模型以整图作为输入，检测并定位图像中的各类版面元素（例如表格、公式等），同时确定其阅读顺序，并根据检测结果裁剪出对应的元素子图；
**第二阶段为 VLM 识别：**
将每个子图独立输入 VLM，生成对应的识别结果（例如 Markdown 文本），随后再按照版面分析阶段给出的顺序对各元素结果进行合并，得到整幅图像的完整解析结果。
> [!note]
> **若需使用 PaddleOCR-VL 的完整能力，必须采用版面分析与 VLM 识别协同的完整流程，而不能仅单独使用 VLM。** 后文会多次涉及相关概念，请注意区分完整的 PaddleOCR-VL 流程与其中的 VLM 组件。以 PaddleOCR-VL v1 为例，版面分析模型为 PP-DocLayoutV2，VLM 为 PaddleOCR-VL-0.9B。需要特别说明的是，“PaddleOCR-VL-0.9B” 并不是 PaddleOCR-VL 的一个模型变种，而是 PaddleOCR-VL v1 完整流程中的 VLM 组件；这与常见 LLM / VLM 的命名习惯不同，例如 Qwen2-72B 通常表示 Qwen2 系列下的一个具体模型变体。
