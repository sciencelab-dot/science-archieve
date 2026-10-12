<script>
    const totalProb = 3;
    let answers = {1: 0, 2: 0, 3: 0};
    const correctAnswers = {1: 3, 2: 3, 3: 3}; 
    let firstIncorrect = null;

    // 답안 마킹 함수
    function markAnswer(probNum, val) {
        answers[probNum] = val;
        const ansDisplay = document.getElementById('ans-' + probNum);
        ansDisplay.innerText = val + '번';
        document.getElementById('omr-' + probNum).classList.add('checked');
    }

    // 이전/다음 문제 이동 함수
    function navProb(targetNum) {
        for(let i=1; i<=totalProb; i++) {
            document.getElementById('prob' + i).classList.remove('active');
        }
        document.getElementById('prob' + targetNum).classList.add('active');
    }

    // 정답 확인 및 제출
    function submitTest() {
        let score = 0;
        firstIncorrect = null;
        
        for(let i=1; i<=totalProb; i++) {
            if(answers[i] === correctAnswers[i]) {
                score++;
            } else if (firstIncorrect === null) {
                firstIncorrect = i;
            }
        }
        
        document.getElementById('test-view').style.display = 'none';
        document.getElementById('result-screen').style.display = 'block';
        
        if (score === totalProb) {
            document.getElementById('score-text').innerText = "💯 만점입니다! (3문제 정답)";
            document.querySelector('.btn-return').style.display = 'none';
        } else {
            document.getElementById('score-text').innerText = score + "문제 정답 / 총 3문제";
            document.querySelector('.btn-return').style.display = 'inline-block';
        }
    }

    // 틀린 문제로 돌아가기
    function returnToIncorrect() {
        document.getElementById('result-screen').style.display = 'none';
        document.getElementById('test-view').style.display = 'flex';
        
        if(firstIncorrect !== null) {
            navProb(firstIncorrect);
        } else {
            navProb(1);
        }
    }

    // 양옆 분할 해설 뷰어 열기
    function openExplanation(probNum) {
        document.getElementById('result-screen').style.display = 'none';
        document.getElementById('explanation-view').style.display = 'flex';
        
        const contentHtml = document.getElementById('prob' + probNum + '-content').innerHTML;
        document.getElementById('exp-left-container').innerHTML = contentHtml;
        
        const solHtml = document.getElementById('sol' + probNum + '-data').innerHTML;
        document.getElementById('exp-right-content').innerHTML = solHtml;
    }

    // 분할 해설 창 닫고 결과 창으로 복귀
    function closeExplanation() {
        document.getElementById('explanation-view').style.display = 'none';
        document.getElementById('result-screen').style.display = 'block';
    }
