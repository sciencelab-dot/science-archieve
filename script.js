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
    
    // 개별 문항 결과를 담을 예쁜 박스 HTML 생성 시작
    let detailHTML = '<div style="margin: 24px auto; font-size: 16px; background: #f8fafc; padding: 20px 30px; border-radius: 8px; text-align: left; display: inline-block; border: 1px solid #e2e8f0; min-width: 280px;">';

    for(let i=1; i<=totalProb; i++) {
        if(answers[i] === correctAnswers[i]) {
            score++;
            // 정답일 경우 (파란색 O)
            detailHTML += `<div style="margin-bottom: 10px; font-weight: 500;">${i}번 문제 : <span style="color: #2563eb; font-weight: bold; margin-left: 8px;">정답 O</span></div>`;
        } else {
            if (firstIncorrect === null) {
                firstIncorrect = i;
            }
            // 틀렸을 경우 (빨간색 X와 내가 입력한 답 표시)
            let myAns = answers[i] ? answers[i] + '번' : '미입력';
            detailHTML += `<div style="margin-bottom: 10px; font-weight: 500;">${i}번 문제 : <span style="color: #dc2626; font-weight: bold; margin-left: 8px;">오답 X</span> <span style="font-size: 14px; color: #64748b; margin-left: 8px;">(내 답: ${myAns})</span></div>`;
        }
    }
    detailHTML += '</div>';

    document.getElementById('test-view').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    if (score === totalProb) {
        document.getElementById('score-text').innerText = "💯 만점입니다! (" + totalProb + "문제 정답)";
        document.querySelector('.btn-return').style.display = 'none';
    } else {
        document.getElementById('score-text').innerText = score + "문제 정답 / 총 " + totalProb + "문제";
        document.querySelector('.btn-return').style.display = 'inline-block';
    }

    // 결과 화면에 문항별 상세 내역(detailHTML) 삽입
    let detailsContainer = document.getElementById('result-details');
    if (!detailsContainer) {
        // 처음 제출할 때 컨테이너를 생성
        detailsContainer = document.createElement('div');
        detailsContainer.id = 'result-details';
        // '틀린 문제로 돌아가기' 버튼 바로 위쪽에 삽입
        let returnBtn = document.querySelector('.btn-return');
        if (returnBtn) {
            returnBtn.parentNode.insertBefore(detailsContainer, returnBtn);
        } else {
            document.getElementById('result-screen').appendChild(detailsContainer);
        }
    }
    detailsContainer.innerHTML = detailHTML;
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
    // 1. 화면 전환 (결과 숨기고 해설창 열기)
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('explanation-view').style.display = 'flex';

    // 2. 오른쪽 빈 공간에 '해설' 채우기
    let hiddenSol = document.getElementById('sol-' + probNum);
    let displayArea = document.getElementById('exp-content-area');

    if (hiddenSol && displayArea) {
        displayArea.innerHTML = hiddenSol.innerHTML;
    }

    // 3. 💡 왼쪽 빈 공간에 '문제' 채우기 (새로 추가된 핵심 코드!)
    let leftContainer = document.getElementById('exp-left-container');
    let originalProb = document.getElementById('prob-' + probNum); // 문제 구역을 찾습니다 (prob-1, prob-2 등)
    
    if (originalProb && leftContainer) {
        // 문제 HTML을 그대로 왼쪽 뷰어에 복사합니다.
        leftContainer.innerHTML = originalProb.innerHTML;
    } else {
        if (leftContainer) leftContainer.innerHTML = "<div style='padding:20px;'>문제 데이터를 불러올 수 없습니다.</div>";
    }
}
    
    // 분할 해설 창 닫고 결과 창으로 복귀
    function closeExplanation() {
        document.getElementById('explanation-view').style.display = 'none';
        document.getElementById('result-screen').style.display = 'block';
    }
