<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
          Talking theme decider
        </h1>
        
        <!-- Tab Navigation -->
        <UTabs :items="tabItems" v-model="activeTab" class="mb-8">
            <!-- Random Selection Tab -->
            <template #random="{ item }">
              <div class="py-4">
                <!-- Random Theme Generator Button -->
                <div class="text-center mb-8">
                  <UButton 
                    @click="generateRandomTheme"
                    size="lg"
                    color="primary"
                    class="px-8 py-4 text-lg font-semibold cursor-pointer"
                  >
                    ランダムで会話テーマを決定
                  </UButton>
                </div>

                <!-- Theme Display -->
                <div v-if="currentTheme" class="mt-8">
                  <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-500">
                    <h2 class="text-xl font-bold text-gray-800 mb-4 text-center">
                      今日の会話テーマ / 今天的对话主题
                    </h2>
                    
                    <div class="space-y-4">
                      <!-- Japanese Theme -->
                      <div class="bg-white rounded-lg p-4 shadow-sm">
                        <div class="flex items-center mb-2">
                          <span class="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                          <span class="font-semibold text-gray-700">日本語</span>
                        </div>
                        <p class="text-lg text-gray-800 font-medium">{{ currentTheme.japanese }}</p>
                      </div>

                      <!-- Chinese Theme -->
                      <div class="bg-white rounded-lg p-4 shadow-sm">
                        <div class="flex items-center mb-2">
                          <span class="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                          <span class="font-semibold text-gray-700">中文</span>
                        </div>
                        <p class="text-lg text-gray-800 font-medium">{{ currentTheme.chinese }}</p>
                      </div>
                    </div>

                    <!-- Generate Another Button -->
                    <div class="text-center mt-6">
                      <UButton 
                        @click="generateRandomTheme"
                        variant="outline"
                        size="md"
                        class="px-6 py-2 cursor-pointer"
                      >
                        別のテーマを生成 / 生成其他主题
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- History Tab -->
            <template #history="{ item }">
              <div class="py-4">
                <h2 class="text-xl font-bold text-gray-800 mb-6 text-center">
                  テーマ履歴 / 主题历史 (過去{{ themeHistory.length }}回分)
                </h2>
                
                <div v-if="themeHistory.length === 0" class="text-center text-gray-500 py-8">
                  まだテーマが選択されていません / 还没有选择过主题
                </div>
                
                <div v-else class="space-y-4 max-h-96 overflow-y-auto">
                  <div 
                    v-for="(historyItem, index) in themeHistory.slice().reverse()" 
                    :key="index"
                    class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border-l-4 border-gray-300"
                  >
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm text-gray-500 font-medium">
                        #{{ themeHistory.length - index }} - {{ historyItem.timestamp }}
                      </span>
                    </div>
                    
                    <div class="space-y-2">
                      <!-- Japanese Theme -->
                      <div class="bg-white rounded p-3 shadow-sm">
                        <div class="flex items-center mb-1">
                          <span class="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          <span class="text-sm font-semibold text-gray-700">日本語</span>
                        </div>
                        <p class="text-gray-800">{{ conversationThemes[historyItem.themeIndex].japanese }}</p>
                      </div>

                      <!-- Chinese Theme -->
                      <div class="bg-white rounded p-3 shadow-sm">
                        <div class="flex items-center mb-1">
                          <span class="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                          <span class="text-sm font-semibold text-gray-700">中文</span>
                        </div>
                        <p class="text-gray-800">{{ conversationThemes[historyItem.themeIndex].chinese }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="themeHistory.length > 0" class="text-center mt-6">
                  <UButton 
                    @click="clearHistoryWithConfirmation"
                    variant="solid"
                    color="red"
                    size="sm"
                    class="px-4 py-2 cursor-pointer"
                  >
                    履歴をクリア / 清除历史
                  </UButton>
                </div>
              </div>
            </template>
          </UTabs>
      </div>
    </div>
    <footer class="text-center text-gray-400 mt-8">
      &copy; 2025 <a href="https://github.com/cyrus07424" target="_blank">cyrus</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import themesJson from '~/data/themes.json'

interface ConversationTheme {
  japanese: string;
  chinese: string;
}

interface ThemeHistoryItem {
  themeIndex: number;
  timestamp: string;
}

const conversationThemes: ConversationTheme[] = themesJson as ConversationTheme[];

// Reactive state
const currentTheme = ref<ConversationTheme | null>(null);
const activeTab = ref(0); // Use index 0 for first tab (random)
const themeHistory = ref<ThemeHistoryItem[]>([]);

// Force initial tab selection
watch(activeTab, (newValue) => {
  console.log('Active tab changed to:', newValue);
}, { immediate: true });

// Tab configuration
const tabItems = [
  {
    key: 'random',
    label: 'ランダム選択 / 随机选择',
    slot: 'random'
  },
  {
    key: 'history', 
    label: '履歴閲覧 / 历史记录',
    slot: 'history'
  }
];

// History management functions
const HISTORY_KEY = 'talkingThemeDecider_history';
const MAX_HISTORY_SIZE = 100;

// Load history from localStorage on component mount
const loadHistory = (): ThemeHistoryItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate the data structure
      if (Array.isArray(parsed)) {
        return parsed.filter(item => 
          typeof item.themeIndex === 'number' && 
          typeof item.timestamp === 'string' &&
          item.themeIndex >= 0 && 
          item.themeIndex < conversationThemes.length
        ).slice(-MAX_HISTORY_SIZE); // Keep only last 100 items
      }
    }
  } catch (error) {
    console.error('Error loading theme history:', error);
  }
  return [];
};

// Save history to localStorage
const saveHistory = (history: ThemeHistoryItem[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    const trimmedHistory = history.slice(-MAX_HISTORY_SIZE);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving theme history:', error);
  }
};

// Add theme to history
const addToHistory = (themeIndex: number) => {
  const timestamp = new Date().toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const newItem: ThemeHistoryItem = {
    themeIndex,
    timestamp
  };
  
  themeHistory.value.push(newItem);
  saveHistory(themeHistory.value);
};

// Clear history
const clearHistory = () => {
  themeHistory.value = [];
  saveHistory([]);
};

// Clear history with confirmation dialog
const clearHistoryWithConfirmation = () => {
  const isConfirmed = confirm('本当に履歴を削除しますか？ / 确定要清除历史记录吗？');
  if (isConfirmed) {
    clearHistory();
  }
};

// Smart random theme generation
const generateRandomTheme = () => {
  let availableIndices: number[] = [];
  
  // Get indices of themes not used in recent history
  const recentIndices = themeHistory.value.slice(-MAX_HISTORY_SIZE).map(item => item.themeIndex);
  const recentSet = new Set(recentIndices);
  
  // Find themes not in recent history
  for (let i = 0; i < conversationThemes.length; i++) {
    if (!recentSet.has(i)) {
      availableIndices.push(i);
    }
  }
  
  // If all themes have been used recently, reset and use all themes
  if (availableIndices.length === 0) {
    availableIndices = Array.from({ length: conversationThemes.length }, (_, i) => i);
  }
  
  // Select random theme from available indices
  const randomIndex = Math.floor(Math.random() * availableIndices.length);
  const selectedThemeIndex = availableIndices[randomIndex];
  
  currentTheme.value = conversationThemes[selectedThemeIndex];
  addToHistory(selectedThemeIndex);
};

// Initialize history on mount
onMounted(() => {
  themeHistory.value = loadHistory();
});

// Setup page meta
useHead({
  title: 'Talking theme decider'
})
</script>