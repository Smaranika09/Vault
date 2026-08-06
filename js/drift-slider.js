$(document).ready(function () {
	const teamCarousel = new DriftSlider.DriftSlider('.drift-slider', {
		modules: [
			DriftSlider.EffectCoverflow,
			DriftSlider.Autoplay
		],
		effect: 'coverflow',
		centeredSlides: true,
		loop: true,
		slidesPerView: 3,
		autoplay: {
			enabled: true,
			delay: 2000
		}
	});
});