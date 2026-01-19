document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm')
  const modal = document.getElementById('confirmationModal')
  const finalSubmitBtn = document.getElementById('finalSubmitBtn')

  // フォーム送信ハンドリング
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    // データの取得
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      university: formData.get('university'),
      department: formData.get('department'),
      grade: formData.get('grade'),
      email: formData.get('email'),
      interests: formData.getAll('interests'),
      message: formData.get('message'),
    }

    // モーダルにデータを反映
    document.getElementById('confirm-name').textContent = data.name
    document.getElementById('confirm-university').textContent = data.university
    document.getElementById('confirm-department').textContent = data.department
    document.getElementById('confirm-grade').textContent = data.grade
    document.getElementById('confirm-email').textContent = data.email

    const interestsText = data.interests.length > 0 ? data.interests.join(', ') : '（選択なし）'
    document.getElementById('confirm-interests').textContent = interestsText

    const messageText = data.message ? data.message : '（入力なし）'
    document.getElementById('confirm-message').textContent = messageText

    // モーダルを表示
    openModal()
  })

  // モーダル制御
  function openModal() {
    modal.setAttribute('aria-hidden', 'false')
    // モーダル内の閉じるボタンにフォーカスを移動（アクセシビリティ）
    const closeBtn = modal.querySelector('.modal-close')
    if (closeBtn) closeBtn.focus()

    // スクロール禁止
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true')
    // スクロール解除
    document.body.style.overflow = ''

    // モーダルを閉じた後に送信ボタンにフォーカスを戻す
    const submitBtn = form.querySelector('button[type="submit"]')
    if (submitBtn) submitBtn.focus()
  }

  // 閉じるボタンとオーバーレイのクリックイベント
  const closeTriggers = document.querySelectorAll('[data-close-modal]')
  closeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', closeModal)
  })

  // ESCキーでモーダルを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal()
    }
  })

  // 最終送信ボタン（今回はアラート表示のみ）
  finalSubmitBtn.addEventListener('click', async () => {
    alert('登録が完了しました！（デモ：実際にはサーバーに送信されます）')
    closeModal()
    await lineNtice()
    form.reset()
  })

  // GAS経由でライン通知
  async function lineNtice() {
    // 1. フォームからデータを取得してオブジェクトにまとめる
    const formData = new FormData(form)
    // console.log("フォームデータ:", Array.from(formData.entries())); // デバッグ用ログ
    // return;

    const data = {
      apiKey: process.env.VITE_GAS_API_KEY, // 環境変数からAPIキーを取得
      name: formData.get('name'),
      university: formData.get('university'),
      department: formData.get('department'),
      grade: formData.get('grade'),
      email: formData.get('email'),
      interests: Array.from(formData.getAll('interests')).join(', '),
      message: formData.get('message'),
    }

    // 2. 作成したGASのウェブアプリURL
    const gasUrl = process.env.VITE_GAS_URL // 環境変数からGASのURLを取得

    try {
      // 3. fetchを使ってGASへデータを送信
      // Content-Typeをあえてtext/plainにすることでCORS制限を回避しやすくします
      const response = await fetch(gasUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(data),
      })

      // 4. 送信後の処理（no-corsモードの場合はレスポンスの中身は読めません）
      alert('登録情報を送信しました。')
      closeModal()
      form.reset()
    } catch (error) {
      console.error('送信エラー:', error)
      alert('通信エラーが発生しました。コンソールを確認してください。')
    }
  }
})
