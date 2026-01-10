document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('confirmationModal');
    const finalSubmitBtn = document.getElementById('finalSubmitBtn');
    
    // フォーム送信ハンドリング
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // データの取得
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            university: formData.get('university'),
            department: formData.get('department'),
            grade: formData.get('grade'),
            email: formData.get('email'),
            interests: formData.getAll('interests'),
            message: formData.get('message')
        };
        
        // モーダルにデータを反映
        document.getElementById('confirm-name').textContent = data.name;
        document.getElementById('confirm-university').textContent = data.university;
        document.getElementById('confirm-department').textContent = data.department;
        document.getElementById('confirm-grade').textContent = data.grade;
        document.getElementById('confirm-email').textContent = data.email;
        
        const interestsText = data.interests.length > 0 
            ? data.interests.join(', ') 
            : '（選択なし）';
        document.getElementById('confirm-interests').textContent = interestsText;
        
        const messageText = data.message ? data.message : '（入力なし）';
        document.getElementById('confirm-message').textContent = messageText;
        
        // モーダルを表示
        openModal();
    });
    
    // モーダル制御
    function openModal() {
        modal.setAttribute('aria-hidden', 'false');
        // モーダル内の閉じるボタンにフォーカスを移動（アクセシビリティ）
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
        
        // スクロール禁止
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.setAttribute('aria-hidden', 'true');
        // スクロール解除
        document.body.style.overflow = '';
        
        // モーダルを閉じた後に送信ボタンにフォーカスを戻す
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.focus();
    }
    
    // 閉じるボタンとオーバーレイのクリックイベント
    const closeTriggers = document.querySelectorAll('[data-close-modal]');
    closeTriggers.forEach(trigger => {
        trigger.addEventListener('click', closeModal);
    });
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });

    // 最終送信ボタン（今回はアラート表示のみ）
    finalSubmitBtn.addEventListener('click', () => {
        alert('登録が完了しました！（デモ：実際にはサーバーに送信されます）');
        closeModal();
        form.reset();
    });
});
