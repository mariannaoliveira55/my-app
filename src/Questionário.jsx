import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

function Questionario() {

    const [respostas, setRespostas] = useState({});
    const [resultado, setResultado] = useState(null);
    const [utilizador, setUtilizador] = useState({nome:'',email:''});
    const navigate = useNavigate();
    
    const perguntas = [
      {id: 1, pergunta: "1) Quando o telefone toca, você:", opcoes: [ {label: "atende imediatamente", value: "E"} , { label: "espera que alguém atenda", value: "I" }]},
      {id: 2, pergunta: "2) Você é mais:", opcoes: [ {label: "realista(vê as coisas concretamente) do que especulativo(vê possibilidades ou padrões implícitos) ", value: "S"} , { label: "especulativo(vê possibilidades ou padrões implícitos) do que realista(vê as coisas concretamente)", value: "N" }]},
      {id: 3, pergunta: "3) O que é pior:", opcoes: [ {label: "ter sua 'cabeça nas nuvens'", value: "S"} , { label: "ter e se manter 'em uma rotina'", value: "N" }]},
      {id: 4, pergunta: "4) Com as pessoas você é mais:", opcoes: [ {label: "firme do que gentil", value: "T"} , { label: "gentil do que firme", value: "F" }]},
      {id: 5, pergunta: "5) Você se sente mais confortável em fazer:", opcoes: [ {label: "juízo lógico", value: "T"} , { label: "juízo de valor", value: "F" }]},
      {id: 6, pergunta: "6) A desordem no local de trabalho é algo que você:", opcoes: [ {label: "tira um tempo para arrumar", value: "J"} , { label: "tolera muito bem", value: "P" }]},
      {id: 7, pergunta: "7) É do seu jeito:", opcoes: [ {label: "decidir rapidamente", value: "J"} , { label: "levar algum tempo antes de decidir", value: "P" }]},
      {id: 8, pergunta: "8) Esperando em uma fila, você geralmente:", opcoes: [ {label: "conversa com os outros", value: "E"} , { label: "limita-se às suas obrigações", value: "I" }]},
      {id: 9, pergunta: "9) Você é mais:", opcoes: [ {label: "sensato do que imaginativo", value: "S"} , { label: "imaginativo do que sensato", value: "N" }]},
      {id: 10, pergunta: "10) Você está mais interessado:", opcoes: [ {label: "no que é real", value: "S"} , { label: "no que é possível", value: "N" }]},
      {id: 11, pergunta: "11) Ao se decidir, é mais provável que você vá por:", opcoes: [ {label: "dados e informações", value: "T"} , { label: "desejos e vontades", value: "F" }]},
      {id: 12, pergunta: "12) Ao abordar os outros, você é inclinado para ser um pouco:", opcoes: [ {label: "objetivo e impessoal", value: "T"} , { label: "amistoso e pessoal", value: "F" }]},
      {id: 13, pergunta: "13) Você está mais confortável com o trabalho que é:", opcoes: [ {label: "contratado", value: "J"} , { label: "feito de forma casual", value: "P" }]},
      {id: 14, pergunta: "14) Você fica mais satisfeito tendo:", opcoes: [ {label: "um produto final", value: "J"} , { label: "um trabalho em progresso", value: "P" }]},
      {id: 15, pergunta: "15) Em uma festa, você:", opcoes: [ {label: "interage com muitas pessoas, até os estranhos", value: "E"} , { label: "interage com os poucos amigos", value: "I" }]},
      {id: 16, pergunta: "16) Você está mais para:", opcoes: [ {label: "fatos do que especulações", value: "S"} , { label: "especulações do que fatos", value: "N" }]},
      {id: 17, pergunta: "17) Escritores devem:", opcoes: [ {label: "dizer o que querem dizer", value: "S"} , { label: "usar metáforas e simbolismos", value: "N" }]},
      {id: 18, pergunta: "18) O que agrada mais a você:", opcoes: [ {label: "consistência de pensamento", value: "T"} , { label: "relações humanas harmoniosas", value: "F" }]},
      {id: 19, pergunta: "19) Se você tiver necessidade de desapontar alguém, você normalmente é:", opcoes: [ {label: "franco e direto", value: "T"} , { label: "caloroso e ponderado", value: "F" }]},
      {id: 20, pergunta: "20) No trabalho você prefere suas atividades:", opcoes: [ {label: "planejadas", value: "J"} , { label: "não-planejadas", value: "P" }]},
      {id: 21, pergunta: "21) Você frequentemente prefere:", opcoes: [ {label: "afirmação final e inalterável", value: "J"} , { label: "afirmação provisória e preliminar", value: "P" }]},
      {id: 22, pergunta: "22) As interações com estranhos:", opcoes: [ {label: "estimula e energiza você", value: "E"} , { label: "gasta suas reservas de energia", value: "I" }]},
      {id: 23, pergunta: "23) Fatos", opcoes: [ {label: "'falam por si'", value: "S"} , { label: "ilustram princípios", value: "N" }]},
      {id: 24, pergunta: "24) Os visionários e teoristas são:", opcoes: [ {label: "um pouco chatos", value: "S"} , { label: "bastante fascinantes", value: "N" }]},
      {id: 25, pergunta: "25) Em uma acalorada discussão, você:", opcoes: [ {label: "tenta ganhar de todas as formas", value: "T"} , { label: "procura um terreno comum", value: "F" }]},
      {id: 26, pergunta: "26) É melhor ser:", opcoes: [ {label: "justo", value: "T"} , { label: "piedoso", value: "F" }]},
      {id: 27, pergunta: "27) No trabalho, é mais natural para você.", opcoes: [ {label: "apontar erros", value: "J"} , { label: "agradar os outros", value: "P" }]},
      {id: 28, pergunta: "28) Você se sente mais confortável:", opcoes: [ {label: "antes de uma decisão", value: "J"} , { label: "depois de uma decisão", value: "P" }]},
      {id: 29, pergunta: "29) Você tende:", opcoes: [ {label: "dizer tudo o que vem na sua mente", value: "E"} , { label: "ter os ouvidos abertos", value: "I" }]},
      {id: 30, pergunta: "30) O senso comum é:", opcoes: [ {label: "raramente questionável", value: "S"} , { label: "frequentemente questionável", value: "N" }]},
      {id: 31, pergunta: "31) Crianças frequentemente não:", opcoes: [ {label: "tornam-se úteis o suficiente", value: "S"} , { label: "exercitam sua fantasia o suficiente", value: "N" }]},
      {id: 32, pergunta: "32) Quando no comando de pessoas, você tende a ser:", opcoes: [ {label: "firme e inflexível", value: "T"} , { label: "clemente e brando", value: "F" }]},
      {id: 33, pergunta: "33) Você é mais frequentemente:", opcoes: [ {label: "uma pessoa de cabeça dura", value: "T"} , { label: "uma pessoa de coração mole", value: "F" }]},
      {id: 34, pergunta: "34) Você tende mais a:", opcoes: [ {label: "colocar a mão na massa", value: "J"} , { label: "explorar possibilidades", value: "P" }]},
      {id: 35, pergunta: "35) Na maioria das situações você é mais:", opcoes: [ {label: "ponderado do que espontâneo", value: "J"} , { label: "espontâneo do que ponderado", value: "P" }]},
      {id: 36, pergunta: "36) Você se acha uma pessoa:", opcoes: [ {label: "aberta", value: "E"} , { label: "privada", value: "I" }]},
      {id: 37, pergunta: "37) Você é mais frequentemente:", opcoes: [ {label: "um tipo prático de pessoa", value: "S"} , { label: "um tipo fantasioso de pessoa", value: "N" }]},
      {id: 38, pergunta: "38) Você fala mais em:", opcoes: [ {label: "particularidades do que generalidades", value: "S"} , { label: "generalidades do que particularidades", value: "N" }]},
      {id: 39, pergunta: "39) Qual pessoa deve ser a mais elogiada, a de:", opcoes: [ {label: "razão clara", value: "T"} , { label: "sentimento forte", value: "F" }]},
      {id: 40, pergunta: "40) Quem governa você mais:", opcoes: [ {label: "seus pensamentos", value: "T"} , { label: "seu coração", value: "F" }]},
      {id: 41, pergunta: "41) Quando termina um trabalho, você gosta de:", opcoes: [ {label: "amarrar todas as pontas soltas", value: "J"} , { label: "passar para outra coisa", value: "P" }]},
      {id: 42, pergunta: "42) Você prefere trabalhar:", opcoes: [ {label: "com prazos determinados", value: "J"} , { label: "sem prazos determinados", value: "P" }]},
      {id: 43, pergunta: "43) Você é o tipo de pessoa que:", opcoes: [ {label: "é bastante falador", value: "E"} , { label: "não sente muita necessidade de falar", value: "I" }]},
      {id: 44, pergunta: "44) Você tende a levar as coisas que são ditas:", opcoes: [ {label: "mais literalmente", value: "S"} , { label: "mais figurativamente", value: "N" }]},
      {id: 45, pergunta: "45) Você muito frequentemente vê:", opcoes: [ {label: "o que está bem na sua frente", value: "S"} , { label: "o que apenas pode ser imaginado", value: "N" }]},
      {id: 46, pergunta: "46) É mais difícil ser:", opcoes: [ {label: "um simplório", value: "T"} , { label: "um nariz empinado", value: "F" }]},
      {id: 47, pergunta: "47) Em circunstâncias difíceis, você às vezes é:", opcoes: [ {label: "muito antipático", value: "T"} , { label: "muito simpático", value: "F" }]},
      {id: 48, pergunta: "48) Você tende a escolher:", opcoes: [ {label: "com bastante cuidado", value: "J"} , { label: "um pouco impulsivamente", value: "P" }]},
      {id: 49, pergunta: "49)  Você é mais inclinado a ser:", opcoes: [ {label: "apressado do que vagaroso", value: "J"} , { label: "vagaroso do que apressado", value: "P" }]},
      {id: 50, pergunta: "50) No trabalho você tende a:", opcoes: [ {label: "ser mais sociável com os colegas", value: "E"} , { label: "ficar mais na sua", value: "I" }]},
      {id: 51, pergunta: "51) Você provavelmente confia mais em:", opcoes: [ {label: "experiências", value: "S"} , { label: "palpites", value: "N" }]},
      {id: 52, pergunta: "52) Você é mais inclinado a ser:", opcoes: [ {label: "pé no chão", value: "S"} , { label: "um pouco “cabeça nas nuvens”", value: "N" }]},
      {id: 53, pergunta: "53) Você pensa em si mesmo como:", opcoes: [ {label: "pessoa determinada", value: "T"} , { label: "pessoa de coração sensível", value: "F" }]},
      {id: 54, pergunta: "54) Você valoriza a si mesmo por ser:", opcoes: [ {label: "sensato", value: "T"} , { label: "dedicado", value: "F" }]},
      {id: 55, pergunta: "55) Você frequentemente deseja que as coisas estejam:", opcoes: [ {label: "resolvidas e decididas", value: "J"} , { label: "apenas rascunhadas", value: "P" }]},
      {id: 56, pergunta: "56) Você diria que é mais:", opcoes: [ {label: "sério e determinado", value: "J"} , { label: "“de boas”", value: "P" }]},
      {id: 57, pergunta: "57) Você se considera:", opcoes: [ {label: "um bom conversador", value: "E"} , { label: "um bom ouvinte", value: "I" }]},
      {id: 58, pergunta: "58) Você se orgulha por ter:", opcoes: [ {label: "uma forte influência da realidade", value: "S"} , { label: "uma imaginação fértil", value: "N" }]},
      {id: 59, pergunta: "59) Você é atraído mais pelos:", opcoes: [ {label: "fundamentos", value: "S"} , { label: "significados ocultos", value: "N" }]},
      {id: 60, pergunta: "60) Qual parece o maior erro:", opcoes: [ {label: "ser muito apaixonado", value: "T"} , { label: "ser objetivo demais", value: "F" }]},
      {id: 61, pergunta: "61) Você é influenciado mais pela:", opcoes: [ {label: "evidência convincente", value: "T"} , { label: "um apelo tocante", value: "F" }]},
      {id: 62, pergunta: "62) É preferível para você principalmente:", opcoes: [ {label: "certificar-se de que as coisas estão organizadas", value: "J"} , { label: "apenas deixar as coisas acontecerem", value: "P" }]},
      {id: 63, pergunta: "63) É preferível na maioria das vezes:", opcoes: [ {label: "ter certeza de que as coisas estão todas programadas", value: "J"} , { label: "deixar que as coisas aconteçam naturalmente", value: "P" }]},
      {id: 64, pergunta: "64) Você é inclinado a ser:", opcoes: [ {label: "fácil de abordar", value: "E"} , { label: "um pouco reservado", value: "I" }]},
      {id: 65, pergunta: "65) Em estórias vocês prefere:", opcoes: [ {label: "ação e aventura", value: "S"} , { label: "fantasia e heroísmo", value: "N" }]},
      {id: 66, pergunta: "66) É mais fácil para você:", opcoes: [ {label: "colocar outras pessoas para lhe serem úteis", value: "S"} , { label: "se identificar e se colocar no lugar das pessoas", value: "N" }]},
      {id: 67, pergunta: "67) Qual você deseja mais para si mesmo:", opcoes: [ {label: "clareza de razão", value: "T"} , { label: "força de compaixão", value: "F" }]},
      {id: 68, pergunta: "68) Você vê a si mesmo basicamente como:", opcoes: [ {label: "pele-fina", value: "T"} , { label: "pele-grossa", value: "F" }]},
      {id: 69, pergunta: "69) Você tende a ver:", opcoes: [ {label: "desordem", value: "J"} , { label: "oportunidades para mudança", value: "P" }]},
      {id: 70, pergunta: "70) Você é mais:", opcoes: [ {label: "rotineiro do que caprichoso", value: "J"} , { label: "caprichoso do que rotineiramente", value: "P" }]}
      ];

    const handleRespostaChange = (e) => {
        setRespostas((prevRespostas) => ({
          ...prevRespostas,
          [e.target.name]: e.target.value,
        }));
    };

    const calcularPersonalidade = async (e) => {
      e.preventDefault();
    
      let contagem = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      Object.keys(respostas).forEach((key) => {
        let letra = respostas[key];
        contagem[letra] += 1;
      });
    
      const tipo =
        (contagem["E"] >= contagem["I"] ? "E" : "I") +
        (contagem["S"] >= contagem["N"] ? "S" : "N") +
        (contagem["T"] >= contagem["F"] ? "T" : "F") +
        (contagem["J"] >= contagem["P"] ? "J" : "P");
    
      try {
        const response = await axios.post("http://localhost:5001/save-user", {
          name: utilizador.nome,
          email: utilizador.email,
          result: tipo,
        });
    
        console.log(response.data);
        alert("Data saved successfully!");
        navigate("/resultado", { state: { mbtiTipo: tipo } });

      } catch (error) {
        console.error("Error saving data:", error);
        alert("Failed to save data.");
      }
    };
    
    return (
        <div>
          <form onSubmit={(e) => calcularPersonalidade(e)}>
            {perguntas.map((q) => (
              <div key={q.id}>
                <p>{q.pergunta}</p>
                {q.opcoes.map((o) => (
                  <label key={o.value}>
                    <input
                      type="radio"
                      name={q.id}
                      value={o.value}
                      onChange={(e) => handleRespostaChange(e)}
                      required
                    /> 
                    {o.label}
                  </label>
                ))}
              </div>
            ))}
            <button type="submit">Finalizar teste</button>
            <label>
               Nome:
                 <input
                    type="text"
                    value={utilizador.nome}
                    onChange={(e) => setUtilizador({ ...utilizador, nome: e.target.value })}
                    required
                 />
            </label>
            <label>
                Email:
                <input
                   type="email"
                   value={utilizador.email}
                   onChange={(e) => setUtilizador({ ...utilizador, email: e.target.value })}
                   required
                />
             </label>
          </form>
        </div>
      );
      
};
export default Questionario;