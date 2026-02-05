import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["display"]

    update(event) {
        const value = event.target.value
        // Value represents 1 to 10. We display as (value / 2).
        const score = (parseFloat(value) / 2).toFixed(1)
        this.displayTarget.textContent = score
    }
}
