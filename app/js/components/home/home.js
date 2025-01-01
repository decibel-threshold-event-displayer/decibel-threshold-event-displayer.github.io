"use strict";

import { engine } from "../../engine.js";
import { toast } from "../../toast.js";
import { ENGINE_GENERATE_STATUS } from "../../enum.js";
import { Component } from "../component.js";
import { WaveFileWrapperError } from "../../audio/wavefilewrapper.js";

export class Home extends Component {
  #renderButton;
  #downloadButton;
  #pdfLink;
  #preview;
  #embed;
  #formData = {
    threshold: 90,
    minDb: null,
    maxDb: null,
    location: "",
    time: this.#formatDateToDatetimeLocal(new Date()),
    device: "",
    distance: null,
    file: null,
  };

  constructor() {
    super("Decibel Threshold Event Displayer", "", "center");
    this.#init();
  }

  async #init() {
    await this._load("home/home.html");
    this.#preview = this._select("#preview");
    this.#preview.style.display = "none";
    this.#embed = this._select("#embed");
    this.#renderButton = this._select("#render");
    this.#renderButton.onclick = () => this.#onRender();
    this.#downloadButton = this._select("#download");
    this.#downloadButton.onclick = () => this.#onDownload();
    this.#downloadButton.style.display = "none";
    this._bind(this.#formData);
    this._selectAll('[data-bs-toggle="tooltip"]').forEach(
      (tooltip) => new bootstrap.Tooltip(tooltip)
    );
  }

  async #onRender() {
    if (!this.#validateForm()) return;

    this.#renderButton.disabled = true;
    this.#downloadButton.style.display = "none";
    this.#preview.style.display = "none";

    try {
      const res = await engine.generate(
        this._select("#file").files[0],
        this.#formData,
        (status) => this.#onStatusUpdate(status)
      );

      this.#embed.src = res + "#toolbar=0&navpanes=0&scrollbar=0";
      this.#pdfLink = res;
      this.#downloadButton.style.display = "block";
      this.#preview.style.display = "block";
    } catch (error) {
      if (error instanceof WaveFileWrapperError) {
        toast.show(
          "An error occured while parsing the audio file: " + error.message
        );
      } else {
        toast.show("Something went wrong preparing your file.");
      }
      console.error(error);
    }

    this.#renderButton.disabled = false;
  }

  #validateForm() {
    const form = this._select("form");
    const minDb = this._select("#minDb");
    const maxDb = this._select("#maxDb");
    const fileUpload = this._select("#file");

    if (parseInt(minDb.value) >= parseInt(maxDb.value))
      maxDb.setCustomValidity("invalid");
    else maxDb.setCustomValidity("");

    if (!this.#formData.file?.endsWith(".wav"))
      fileUpload.setCustomValidity("invalid");
    else fileUpload.setCustomValidity("");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return false;
    }

    return true;
  }

  #onDownload() {
    var link = document.createElement("a");
    link.download = "report.pdf";
    link.href = this.#pdfLink;
    link.click();
  }

  #onStatusUpdate(status) {
    this.#renderButton.innerHTML = this.#formatGenerationStatus(status);
  }

  #formatGenerationStatus(status) {
    switch (status) {
      case ENGINE_GENERATE_STATUS.INITIALIZATION:
        return "Initializing PDF engine...";
      case ENGINE_GENERATE_STATUS.ANALYZING_FILE:
        return "Analyzing your WAV file...";
      case ENGINE_GENERATE_STATUS.READYING_FILE:
        return "Preparing file structure...";
      case ENGINE_GENERATE_STATUS.GENERATING:
        return "Generating your PDF...";
      default:
        return "Generate PDF";
    }
  }

  #formatDateToDatetimeLocal(date) {
    const pad = (num) => String(num).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
