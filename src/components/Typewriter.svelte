<script lang="ts">
	let text = $state('developer');

	const titles = ['developer', 'designer'];
	const maxLength = titles.reduce((acc, str) => Math.max(acc, str.length), 0);

	const delayStart = 500;
	const delayEnd = 1500;
	const msPerLetter = 50;
	const fps = 30;

	const animation = (i: number, out = false) => {
		const index = i % titles.length;
		const deltaIteration = 1000 / fps / msPerLetter;
		const delayStartIterations = delayStart / msPerLetter;

		let iteration = 0;

		const interval = setInterval(() => {
			if (out) {
				const currentText = titles[index];
				text = currentText
					.split('')
					.map((_, i) => (i >= iteration ? currentText[i] : randomChar()))
					.join('');

				if (iteration >= currentText.length) {
					clearInterval(interval);
					animation(index + 1);
				}
			} else {
				const currentText = titles[index % titles.length].padEnd(maxLength, ' ');
				text = currentText
					.split('')
					.map((_, i) => (i < iteration - delayStartIterations ? currentText[i] : randomChar()))
					.join('');

				if (iteration - delayStartIterations >= currentText.length) {
					clearInterval(interval);
					setTimeout(() => animation(index, true), delayEnd);
				}
			}

			iteration += deltaIteration;
		}, 1000 / fps);
	};

	const randomChar = () => {
		const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
	};

	$effect(() => {
		animation(0);
	});
</script>

<div class="typewriter-container">
	I am a <span class="typewriter">{text}</span>
</div>
