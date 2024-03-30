import { IContentModal } from "../types";
import { cloneTemplate } from "../utils/utils";
import { Component } from "./base/components";
import { Modal } from "./common/Modal";

export class ContentModal extends Modal implements IContentModal {
	container: HTMLDivElement

	constructor (div:HTMLDivElement){
		super(div)
	}
}