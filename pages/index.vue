<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
          Talking theme decider
        </h1>
        
        <!-- Random Theme Generator Button -->
        <div class="text-center mb-8">
          <UButton 
            @click="generateRandomTheme"
            size="lg"
            color="primary"
            class="px-8 py-4 text-lg font-semibold"
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
                class="px-6 py-2"
              >
                別のテーマを生成 / 生成其他主题
              </UButton>
            </div>
          </div>
        </div>
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

const conversationThemes: ConversationTheme[] = themesJson as ConversationTheme[];

const currentTheme = ref<ConversationTheme | null>(null);

const generateRandomTheme = () => {
  const randomIndex = Math.floor(Math.random() * conversationThemes.length);
  currentTheme.value = conversationThemes[randomIndex];
};
</script>