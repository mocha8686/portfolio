<script lang="ts">
	let text = $state('developer');

	const titles = ['developer', 'designer', 'specialist', 'enthusiast', 'hacker', 'tinkerer'];
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
				const currentText = titles[index % titles.length];
				const length = currentText.length;
				const padStart = Math.ceil((maxLength - length) / 2) + length;
				const currentTextPadded = currentText.padStart(padStart, ' ').padEnd(maxLength, ' ');

				text = currentTextPadded
					.split('')
					.map((_, i) =>
						i < iteration - delayStartIterations ? currentTextPadded[i] : randomChar(),
					)
					.join('');

				if (iteration - delayStartIterations >= currentTextPadded.length) {
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
