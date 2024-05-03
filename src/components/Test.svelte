<script lang="ts">
	let thing = $state('world');
</script>

<p>Hello, {thing}!</p>
<input bind:value={thing} />
