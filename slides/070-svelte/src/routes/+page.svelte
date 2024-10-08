<script>
  let count = 0;
  $: triple = count * 3;
  $: isTripleEven = triple % 2 === 0;
</script>

<p>Count: {count}</p>
<p>Triple: {triple}</p>
<p>Is triple even: {isTripleEven ? 'yes' : 'no'}</p>
<p><button on:click={() => count++}>+1</button></p>