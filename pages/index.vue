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
interface ConversationTheme {
  japanese: string;
  chinese: string;
}

const conversationThemes: ConversationTheme[] = [
  {
    japanese: "子供の頃の夢と現在の自分について話してみましょう",
    chinese: "聊聊童年的梦想和现在的自己"
  },
  {
    japanese: "もし1日だけ超能力が使えるとしたら何をしますか？",
    chinese: "如果有一天能使用超能力，你会做什么？"
  },
  {
    japanese: "人生で最も影響を受けた本や映画について教えてください",
    chinese: "请分享对你人生影响最大的书籍或电影"
  },
  {
    japanese: "10年後の自分はどんな人になっていたいですか？",
    chinese: "你希望10年后的自己变成什么样的人？"
  },
  {
    japanese: "もし無人島に3つだけ持って行けるとしたら何を選びますか？",
    chinese: "如果到无人岛只能带三样东西，你会选择什么？"
  },
  {
    japanese: "今まで経験した中で最も勇気が必要だったことは何ですか？",
    chinese: "到目前为止，你经历过的最需要勇气的事情是什么？"
  },
  {
    japanese: "理想的な1日の過ごし方について話してみましょう",
    chinese: "聊聊你理想中的一天是怎样度过的"
  },
  {
    japanese: "もし時間を戻せるとしたら、どの瞬間に戻りたいですか？",
    chinese: "如果能让时间倒流，你最想回到哪个时刻？"
  },
  {
    japanese: "人生で最も大切にしている価値観は何ですか？",
    chinese: "你人生中最重视的价值观是什么？"
  },
  {
    japanese: "もし世界中どこでも住めるとしたら、どこに住みたいですか？",
    chinese: "如果可以在世界任何地方居住，你想住在哪里？"
  },
  {
    japanese: "今の自分にアドバイスをするとしたら何と言いますか？",
    chinese: "如果要给现在的自己一个建议，你会说什么？"
  },
  {
    japanese: "人生で最も感動した瞬間について教えてください",
    chinese: "请分享你人生中最感动的时刻"
  },
  {
    japanese: "もし魔法が使えるとしたら、世界をどう変えたいですか？",
    chinese: "如果你会魔法，你想如何改变这个世界？"
  },
  {
    japanese: "今までで最も困難だった挑戦とその結果について話してください",
    chinese: "聊聊你遇到过的最困难的挑战和结果"
  },
  {
    japanese: "もし1億円もらえるとしたら何に使いますか？",
    chinese: "如果得到一亿日元，你会用来做什么？"
  },
  {
    japanese: "人生で最も学んだことがある失敗経験について教えてください",
    chinese: "请分享你从失败中学到最多的经历"
  },
  {
    japanese: "理想の友人関係について話してみましょう",
    chinese: "聊聊你理想中的友谊关系"
  },
  {
    japanese: "もし今日が人生最後の日だとしたら何をしますか？",
    chinese: "如果今天是人生的最后一天，你会做什么？"
  },
  {
    japanese: "自分の性格で最も好きな部分と変えたい部分は何ですか？",
    chinese: "你最喜欢自己性格的哪个部分？最想改变哪个部分？"
  },
  {
    japanese: "人生で最も印象に残っている旅行について話してください",
    chinese: "请分享你人生中印象最深刻的旅行经历"
  },
  {
    japanese: "もし歴史上の人物と会えるとしたら誰に会いたいですか？",
    chinese: "如果能见到历史人物，你最想见谁？"
  },
  {
    japanese: "今の社会で最も解決したい問題は何ですか？",
    chinese: "你认为当今社会最需要解决的问题是什么？"
  },
  {
    japanese: "人生で最も誇りに思う瞬間について教えてください",
    chinese: "请分享你人生中最引以为豪的时刻"
  },
  {
    japanese: "もし動物と話せるとしたら、どの動物と何について話したいですか？",
    chinese: "如果能和动物对话，你想和什么动物聊什么？"
  },
  {
    japanese: "自分らしさとは何だと思いますか？",
    chinese: "你认为什么是真正的自己？"
  }
];

const currentTheme = ref<ConversationTheme | null>(null);

const generateRandomTheme = () => {
  const randomIndex = Math.floor(Math.random() * conversationThemes.length);
  currentTheme.value = conversationThemes[randomIndex];
};
</script>