interface HeroProps {
  activeUsers: number;
  sessionActive: boolean;
  hasIntegratedCamera: boolean;
}

export function Hero({
  activeUsers,
  sessionActive,
  hasIntegratedCamera,
}: HeroProps) {
  return (
    <header className="hero">
      <div className="hero__badge">MVP Arena Remota com ESP32 + 3D Print</div>
      <h1>
        Controle robos de combate em tempo real, alugue por minuto e entre na
        arena com visual premium.
      </h1>
      <p>
        Escolha entre modelos em veiculos e mechas, ative feed de camera e
        pilote pela web em uma experiencia focada em competicao e brincadeira.
      </p>
      <div className="hero__inline-status">
        <span className={`status ${sessionActive ? "on" : "off"}`}>
          {sessionActive ? "Sessao em andamento" : "Sessao em espera"}
        </span>
        <span className="hero__camera-hint">
          {hasIntegratedCamera
            ? "Modelo com camera onboard ativa"
            : "Modelo com camera da arena (taxa adicional)"}
        </span>
      </div>
      <div className="hero__stats">
        <div>
          <span>Usuarios online</span>
          <strong>{activeUsers}</strong>
        </div>
        <div>
          <span>Latencia media</span>
          <strong>24ms</strong>
        </div>
        <div>
          <span>Arenas disponiveis</span>
          <strong>03</strong>
        </div>
      </div>
    </header>
  );
}
