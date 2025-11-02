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
	/**
	 * Esconde o botão "scroll to top" quando está no topo da página
	 */
	const buttonTop = document.getElementById("buttonTop");
	const toggleButtonTop = () => {
		if (window.scrollY > 500) {
			buttonTop.style.display = "flex";
		} else {
			buttonTop.style.display = "none";
		}
	};
	window.addEventListener("scroll", toggleButtonTop);
	toggleButtonTop();

	/**
	 * Sistema de Tabs para Poiquilócitos
	 */
	const tabButtons = document.querySelectorAll('[role="tab"]');
	const tabPanels = document.querySelectorAll('[role="tabpanel"]');

	if (tabButtons.length === 0) return;
	// Função para mostrar uma tab específica com animação
	const showTab = (targetId) => {
		// Esconde todos os painéis e remove seleção de todos os botões
		tabPanels.forEach((panel) => {
			panel.hidden = true;
			panel.classList.remove("opacity-100", "translate-y-0");
			panel.classList.add("opacity-0", "translate-y-8");
		});
		tabButtons.forEach((button) => {
			button.setAttribute("aria-selected", "false");
		});

		// Mostra o painel alvo e marca o botão como selecionado
		const targetPanel = document.querySelector(targetId);
		const targetButton = document.querySelector(`[data-tabs-target="${targetId}"]`);

		if (targetPanel && targetButton) {
			targetPanel.hidden = false;
			targetButton.setAttribute("aria-selected", "true");

			// Adiciona animação ao painel ativo
			setTimeout(() => {
				targetPanel.classList.remove("opacity-0", "translate-y-8");
				targetPanel.classList.add("opacity-100", "translate-y-0");
			}, 100); // delay porque o card demora pra aparecer
		}
	};

	// Adiciona evento de clique em cada botão de tab, tava com preguiça de colocar na mão
	tabButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const targetId = button.getAttribute("data-tabs-target");
			showTab(targetId);
		});
	});

	// Mostra a primeira tab por padrão (já está visível no HTML, mas é bom garantir)
	const firstTab = tabButtons[0]?.getAttribute("data-tabs-target");
	if (firstTab) {
		showTab(firstTab);
	}

	/**
	 * Sistema de Modais para Scroll Cards
	 */
	const openModal = (modalId) => {
		const modal = document.getElementById(modalId);
		if (modal) {
			modal.classList.remove("hidden");
			modal.classList.add("flex");
		}
	};

	const closeModal = (modalId) => {
		const modal = document.getElementById(modalId);
		if (modal) {
			modal.classList.add("hidden");
			modal.classList.remove("flex");
		}
	};

	// Adiciona evento de clique para abrir o modal
	document.querySelectorAll("[data-modal]").forEach((button) => {
		button.addEventListener("click", () => {
			const modalId = button.getAttribute("data-modal");
			openModal(modalId);
		});
	});

	// Adiciona evento de clique para fechar o modal
	document.querySelectorAll("[data-modal-hide]").forEach((button) => {
		button.addEventListener("click", () => {
			const modalId = button.getAttribute("data-modal-hide");
			closeModal(modalId);
		});
	});

	// Fecha o modal ao clicar fora do conteúdo (no background)
	document.querySelectorAll(".modal").forEach((modal) => {
		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				const modalId = modal.id;
				closeModal(modalId);
			}
		});
	});

});

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}
