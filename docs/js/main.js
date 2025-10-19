document.addEventListener("DOMContentLoaded", () => {
	/**
	 * Efeito de fade-in ao rolar o scroll
	 */
	const elements = document.querySelectorAll(".scroll-fade"); // classe CSS
	const showOnScroll = () => {
		elements.forEach((el) => {
			const rect = el.getBoundingClientRect(); // pega a posição do elemento
			if (rect.top < window.innerHeight - 225) {
				// se o topo do elemento estiver visível
				el.classList.add("opacity-100", "translate-y-0");
				el.classList.remove("opacity-0", "translate-y-8");
			}
		});
	};
	window.addEventListener("scroll", showOnScroll);
	showOnScroll();


    /**
     * Scroll horizontal com clique e arraste
     */
	const container = document.querySelector(".scroll-container");
	let isDown = false; // Indica se o mouse está pressionado
	let startX; // Posição inicial do mouse
	let scrollLeft; // Posição inicial do scroll

	if (container) {
		container.addEventListener("mousedown", (e) => {
			isDown = true;
			container.classList.add("cursor-grabbing");
			startX = e.pageX - container.offsetLeft; // Posição do mouse relativa ao container
			scrollLeft = container.scrollLeft; // Posição atual do scroll
		});

		container.addEventListener("mouseleave", () => {
			isDown = false;
			container.classList.remove("cursor-grabbing");
		});

		container.addEventListener("mouseup", () => {
			isDown = false;
			container.classList.remove("cursor-grabbing");
		});

		container.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - container.offsetLeft; // Posição atual do mouse
			const walk = (x - startX) * 1.5; // Sensibilidade
			container.scrollLeft = scrollLeft - walk; // Atualiza a posição do scroll
		});
	}
});
