<script lang="ts">
</script>

<footer class="footer">
  <nav class="footer__nav">
    <ul class="footer__nav-list">
      <li class="footer__nav-item">Instagram</li>
      <li class="footer__nav-item">Tiktok</li>
      <li class="footer__nav-item">LinkedIn</li>
    </ul>
  </nav>
</footer>

<style>
  .footer {
    background-color: var(--background-color);
    padding: 1rem;
    text-align: center;
    border-top: 0.1rem solid var(--neutral-color);
    position: relative;
    z-index: 10;
    transition: transform 0.3s ease;
  }

  .footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    background-color: var(--primary-color);
  }

  .footer__nav {
    margin: 1rem 0;
  }

  .footer__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .footer__nav-item {
    color: var(--primary-color);
    font-weight: bold;
    cursor: pointer;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }

  .footer__nav-item:hover {
    color: var(--accent-color);
    transform: translateY(-0.25rem);
  }
</style>
