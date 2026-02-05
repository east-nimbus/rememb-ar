import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["tab", "content", "detailInput", "nonAlcCheckbox", "toastContainer", "toastText"]

    switch(event) {
        const selectedTab = event.currentTarget.dataset.tabName
        this.tabTargets.forEach(tab => tab.classList.toggle("tab-active", tab.dataset.tabName === selectedTab))
        this.contentTargets.forEach(content => content.classList.toggle("hidden", content.dataset.tabName !== selectedTab))
    }

    validate() {
        const value = parseFloat(this.detailInputTarget.value)
        if (isNaN(value)) return

        if (value === 0) {
            this.nonAlcCheckboxTarget.checked = true
            this.toggleNonAlc()
            return
        }

        if (value < 0 || value > 100) {
            this.showToast("度数は 0 以上 100 以下で入力してください")
            this.detailInputTarget.value = ""
        }
    }

    toggleNonAlc() {
        const isNonAlc = this.nonAlcCheckboxTarget.checked
        this.detailInputTarget.disabled = isNonAlc
        if (isNonAlc) {
            this.detailInputTarget.value = ""
            // 度数感セレクトボックスを「ノンアルコール」に同期
            const percentageSelect = document.querySelector('select[name="cocktail[alcohol_percentage]"]')
            if (percentageSelect) percentageSelect.value = "non_alc"
        }
    }

    showToast(message) {
        this.toastTextTarget.textContent = message
        this.toastContainerTarget.classList.remove("hidden")
        setTimeout(() => {
            this.toastContainerTarget.classList.add("hidden")
        }, 4000)
    }
}
