import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["baseContent", "alcoholContent", "baseTab", "alcoholTab"]

    connect() {
        this.showBase()
    }

    showBase() {
        this.baseContentTarget.classList.remove("hidden")
        this.alcoholContentTarget.classList.add("hidden")

        this._setActiveTab(this.baseTabTarget)
        this._setInactiveTab(this.alcoholTabTarget)
    }

    showAlcohol() {
        this.baseContentTarget.classList.add("hidden")
        this.alcoholContentTarget.classList.remove("hidden")

        this._setActiveTab(this.alcoholTabTarget)
        this._setInactiveTab(this.baseTabTarget)
    }

    _setActiveTab(tab) {
        tab.classList.remove("bg-indigo-100", "text-gray-600")
        tab.classList.add("bg-rose-100", "border-2", "border-rose-400", "text-gray-800")
    }

    _setInactiveTab(tab) {
        tab.classList.add("bg-indigo-100", "text-gray-600")
        tab.classList.remove("bg-rose-100", "border-2", "border-rose-400", "text-gray-800")
    }
}
