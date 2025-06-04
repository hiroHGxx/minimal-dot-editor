// グローバル変数
const GRID_SIZE = 16; // 16x16のグリッド
const DEFAULT_COLOR = '#FFFFFF'; // デフォルトの色（白）
const COLORS = [
    '#000000', // 黒
    '#FF0000', // 赤
    '#00FF00', // 緑
    '#0000FF', // 青
    '#FFFF00', // 黄
    '#FF00FF', // マゼンタ
    '#00FFFF', // シアン
    '#FFA500', // オレンジ
    '#A52A2A', // 茶色
    '#808080'  // グレー
];

let selectedColor = COLORS[0]; // デフォルトで最初の色を選択

// ページの読み込みが完了したら初期化
document.addEventListener('DOMContentLoaded', () => {
    createGrid(GRID_SIZE);
    createColorPalette();
    
    // イベントリスナーの設定
    document.getElementById('clear-button').addEventListener('click', clearGrid);
    document.getElementById('resize-button').addEventListener('click', handleResize);
    document.getElementById('save-button').addEventListener('click', saveImage);
});

/**
 * グリッドをリサイズするハンドラー
 */
function handleResize() {
    const newSize = parseInt(document.getElementById('grid-size').value);
    createGrid(newSize);
}

/**
 * 画像を保存する関数
 */
function saveImage() {
    const gridContainer = document.getElementById('grid-container');
    const gridCells = document.querySelectorAll('.grid-cell');
    const size = Math.sqrt(gridCells.length);
    
    // キャンバスを作成
    const canvas = document.createElement('canvas');
    const scale = 10; // 拡大スケール
    canvas.width = size * scale;
    canvas.height = size * scale;
    const ctx = canvas.getContext('2d');
    
    // セルの色をキャンバスに描画
    gridCells.forEach((cell, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        ctx.fillStyle = cell.style.backgroundColor || DEFAULT_COLOR;
        ctx.fillRect(col * scale, row * scale, scale, scale);
    });
    
    // 画像としてダウンロード
    const link = document.createElement('a');
    link.download = `dot-art-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

/**
 * グリッドを生成する関数
 * @param {number} size - グリッドの一辺のセル数
 */
function createGrid(size) {
    const gridContainer = document.getElementById('grid-container');
    
    // グリッドのスタイルを設定
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    // 既存のセルをクリア
    gridContainer.innerHTML = '';
    
    // グリッドのセルを生成
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.backgroundColor = DEFAULT_COLOR;
        cell.addEventListener('click', handleCellClick);
        gridContainer.appendChild(cell);
    }
}

/**
 * カラーパレットを生成する関数
 */
function createColorPalette() {
    const paletteContainer = document.getElementById('color-palette-container');
    
    COLORS.forEach((color, index) => {
        const colorButton = document.createElement('button');
        colorButton.classList.add('color-button');
        if (index === 0) {
            colorButton.classList.add('selected'); // 最初の色を選択状態に
        }
        colorButton.style.backgroundColor = color;
        colorButton.setAttribute('data-color', color);
        colorButton.addEventListener('click', handleColorSelect);
        paletteContainer.appendChild(colorButton);
    });
}

/**
 * 色選択のハンドラー
 * @param {Event} event - クリックイベント
 */
function handleColorSelect(event) {
    // すべての色ボタンから選択状態を削除
    document.querySelectorAll('.color-button').forEach(button => {
        button.classList.remove('selected');
    });
    
    // クリックされたボタンを選択状態に
    const selectedButton = event.target;
    selectedButton.classList.add('selected');
    
    // 選択された色を更新
    selectedColor = selectedButton.style.backgroundColor;
}

/**
 * セルクリックのハンドラー
 * @param {Event} event - クリックイベント
 */
function handleCellClick(event) {
    event.target.style.backgroundColor = selectedColor;
}

/**
 * グリッドをクリアする関数
 */
function clearGrid() {
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.style.backgroundColor = DEFAULT_COLOR;
    });
}
