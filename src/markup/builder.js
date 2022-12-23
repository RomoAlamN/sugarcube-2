class OutputBuilder {
	constructor() {
		this.root = new HTMLElement("div", true);
	}
}

class SCElement {
	/**
	 * Creates a new Sugarcube element
	 * @param {string} type the element type
	 * @param {boolean} container is this a container
	 */
	constructor(type, container) {
		/** @type{boolean} */
		this.container = container;
		/** @type{string} */
		this.type = type;
		if (this.container === true) {
			/** @type{Array<SCElement>} */
			this.children = [];
		}
	}
	/**
	 * @returns {string} the string representation of this object
	 */
	get repr() {
		return getStringRepresentation();
	}

	getStringRepresentation() {
		if (this.container) {
			let a = "";
			for (let el of this.children) {
				a += el.repr;
			}
			return a;
		} else {
			return "";
		}
	}

}
class HTMLElement extends SCElement {
	constructor(type, container, self_closing, id, classList) {
		super(type, container);
		this.id = id;
		this.classList = classList;
		this.contents = "";
		if (this.self_closing && this.container) {
			throw new Error("Self closing tag cannot be container.")
		}
	}

	getStringRepresentation() {
		let classes = "";
		for (let c of this.classList ?? []) {
			classes += c + " ";
		}
		if (this.container) {
			let a = `<${this.type} id='${this.id ?? ""}' class='${classes}>`
			for (let c of this.children ?? []) {
				a += c.repr;
			}
			a += this.contents;
			a += `</${this.type}>`
		} else {
			if (this.self_closing) {
				return `<${this.type} id='${this.id ?? ""}' class='${classes}'/>`
			}else {
				return `<${this.type} id='${this.id ?? ""}' class='${classes}'>${this.contents}</${this.type}>`
			}
		}
	}
}