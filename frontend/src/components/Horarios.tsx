import {
  FaPaw,
  FaBan,
  FaLeaf,
  FaTree,
  FaSearch,
  FaGift,
  FaRegClock,
  FaClipboardList,
  FaCalendarWeek,
  FaSun,
  FaUmbrellaBeach,
} from "react-icons/fa";
import "../App.css";

const HorariosENormas = () => {
  return (
    <section className="horarios-normas-section">
      <div className="card-wrapper row g-4">
        <div className="card horarios-card col-md-6 col-12">
          <h3 className="card-title">
            <FaRegClock className="me-2 text-green" />
            Horários de Funcionamento
          </h3>
          <div className="horarios-list">
            <div className="horario-item">
              <div className="horario-details">
                <strong className="horario-day">
                  <FaCalendarWeek className="me-2 text-green" />
                  Segunda a Sexta
                </strong>
                <span className="horario-info">Entrada até às 16h</span>
              </div>
              <span className="horario-time">8h às 17h</span>
            </div>

            <div className="horario-item">
              <div className="horario-details">
                <strong className="horario-day">
                  <FaSun className="me-2 text-green" />
                  Sábados e Domingos
                </strong>
                <span className="horario-info">Entrada até às 17h</span>
              </div>
              <span className="horario-time">9h às 18h</span>
            </div>

            <div className="horario-item">
              <div className="horario-details">
                <strong className="horario-day">
                  <FaUmbrellaBeach className="me-2 text-green" />
                  Feriados
                </strong>
                <span className="horario-info">Entrada até às 15h</span>
              </div>
              <span className="horario-time">10h às 16h</span>
            </div>
          </div>
          <div className="alert alert-warning mt-3" role="alert">
            <strong>Nota:</strong> O jardim pode fechar mais cedo em condições
            climáticas adversas. Consulte nosso site ou redes sociais para
            informações atualizadas.
          </div>
        </div>

        <div className="card normas-card col-md-6 col-12">
          <h3 className="card-title">
            <FaClipboardList className="me-2 text-green" />
            Normas do Jardim
          </h3>
          <div className="normas-list">
            <p>
              <FaPaw className="me-2 text-green" />
              <strong>Animais de Estimação:</strong> Não é permitido o ingresso
              de animais domésticos fora da guia em hipótese alguma (apenas PETs
              de pequeno porte podem ingressar), pela segurança dos visitantes e
              da coleção.
            </p>
            <p>
              <FaBan className="me-2 text-green" />
              <strong>Proibições:</strong> É proibido o uso de bebidas
              alcoólicas ou cigarros, atear fogo, cavar, perseguir e capturar
              animais, arrancar mudas ou tirar lenha.
            </p>
            <p>
              <FaLeaf className="me-2 text-green" />
              <strong>Coleta de Material Botânico:</strong> A coleta de material
              botânico, fotos artísticas para uso particular e comercial não são
              permitidas, exceto com autorização por escrito da Direção. Fotos
              sem fins comerciais podem ser tiradas e compartilhadas nas redes
              sociais, marcando o Jardim Botânico.
            </p>
            <p>
              <FaTree className="me-2 text-green" />
              <strong>Coleta de Plantas:</strong> A coleta de plantas, mesmo
              para uso medicinal, não é permitida. Todas as coletas para
              pesquisa, ensino ou projetos em parceria devem ser autorizadas
              previamente pela Direção.
            </p>
            <p>
              <FaSearch className="me-2 text-green" />
              <strong>Pesquisas:</strong> Orientadores e bolsistas devem
              encaminhar cópia do projeto à direção para autorização. É vedado
              solicitar auxílio dos funcionários para projetos de pesquisa ou
              extensão, assim como a utilização de máquinas ou ferramentas do
              JBSM, exceto em projetos desenvolvidos pelo órgão.
            </p>
            <p>
              <FaGift className="me-2 text-green" />
              <strong>Doações:</strong> Não trabalhamos com venda nem doação de
              mudas. A recepção de doações de plantas só ocorrerá com a anuência
              prévia da Direção, respeitando o interesse estratégico e a
              organização do Jardim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorariosENormas;
