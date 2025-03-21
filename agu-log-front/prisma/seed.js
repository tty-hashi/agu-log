import { PrismaClient } from '@prisma/client'
import process from 'process'
const prisma = new PrismaClient()

async function main() {
  // タグカテゴリを作成
  const categories = [
    {
      name: '野菜',
      description: '野菜の栽培や品種に関するタグ',
    },
    {
      name: '果物',
      description: '果物の栽培や品種に関するタグ',
    },
    {
      name: '栽培方法',
      description: '栽培方法や技術に関するタグ',
    },
    {
      name: '病害虫',
      description: '病気や害虫に関するタグ',
    },
    {
      name: '気候・季節',
      description: '季節や気候条件に関するタグ',
    },
  ]

  for (const category of categories) {
    await prisma.tagCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    })
  }

  // カテゴリのIDを取得
  const vegetableCategory = await prisma.tagCategory.findUnique({ where: { name: '野菜' } })
  const fruitCategory = await prisma.tagCategory.findUnique({ where: { name: '果物' } })
  const methodCategory = await prisma.tagCategory.findUnique({ where: { name: '栽培方法' } })
  const pestCategory = await prisma.tagCategory.findUnique({ where: { name: '病害虫' } })
  const seasonCategory = await prisma.tagCategory.findUnique({ where: { name: '気候・季節' } })

  // タグデータの定義
  const tags = [
    // 野菜カテゴリのタグ
    { name: 'ニンジン', slug: 'carrot', categoryId: vegetableCategory?.id },
    { name: '白菜', slug: 'chinese-cabbage', categoryId: vegetableCategory?.id },
    { name: 'キャベツ', slug: 'cabbage', categoryId: vegetableCategory?.id },
    { name: 'ほうれん草', slug: 'spinach', categoryId: vegetableCategory?.id },
    { name: '大根', slug: 'daikon', categoryId: vegetableCategory?.id },
    { name: 'えだまめ', slug: 'edamame', categoryId: vegetableCategory?.id },
    { name: 'カボチャ', slug: 'pumpkin', categoryId: vegetableCategory?.id },
    { name: 'とうもろこし', slug: 'corn', categoryId: vegetableCategory?.id },

    // 果物カテゴリのタグ
    { name: 'リンゴ', slug: 'apple', categoryId: fruitCategory?.id },
    { name: 'ブドウ', slug: 'grape', categoryId: fruitCategory?.id },
    { name: 'イチゴ', slug: 'strawberry', categoryId: fruitCategory?.id },
    { name: 'ミカン', slug: 'mandarin', categoryId: fruitCategory?.id },
    { name: 'モモ', slug: 'peach', categoryId: fruitCategory?.id },
    { name: 'ナシ', slug: 'pear', categoryId: fruitCategory?.id },
    { name: 'カキ', slug: 'persimmon', categoryId: fruitCategory?.id },
    { name: 'ブルーベリー', slug: 'blueberry', categoryId: fruitCategory?.id },
    { name: 'キウイ', slug: 'kiwi', categoryId: fruitCategory?.id },
    { name: 'スイカ', slug: 'watermelon', categoryId: fruitCategory?.id },

    // 栽培方法カテゴリのタグ
    { name: '有機栽培', slug: 'organic', categoryId: methodCategory?.id },
    { name: '水耕栽培', slug: 'hydroponics', categoryId: methodCategory?.id },
    { name: '土耕栽培', slug: 'soil-based', categoryId: methodCategory?.id },
    { name: '露地栽培', slug: 'open-field', categoryId: methodCategory?.id },
    { name: '植物工場', slug: 'plant-factory', categoryId: methodCategory?.id },
    { name: '自然農法', slug: 'natural-farming', categoryId: methodCategory?.id },
    { name: '無農薬栽培', slug: 'pesticide-free', categoryId: methodCategory?.id },
    { name: '低農薬栽培', slug: 'low-pesticide', categoryId: methodCategory?.id },
    { name: '鉢植え栽培', slug: 'pot-cultivation', categoryId: methodCategory?.id },
    { name: 'プランター栽培', slug: 'planter-cultivation', categoryId: methodCategory?.id },
    { name: '苗作り', slug: 'seedling', categoryId: methodCategory?.id },
    { name: '接ぎ木', slug: 'grafting', categoryId: methodCategory?.id },
    { name: '剪定', slug: 'pruning', categoryId: methodCategory?.id },

    // 病害虫カテゴリのタグ
    { name: 'うどんこ病', slug: 'powdery-mildew', categoryId: pestCategory?.id },
    { name: 'アブラムシ', slug: 'aphid', categoryId: pestCategory?.id },
    { name: '灰色かび病', slug: 'gray-mold', categoryId: pestCategory?.id },
    { name: 'ハダニ', slug: 'spider-mite', categoryId: pestCategory?.id },
    { name: '疫病', slug: 'phytophthora', categoryId: pestCategory?.id },
    { name: '黒星病', slug: 'black-spot', categoryId: pestCategory?.id },
    { name: 'モザイク病', slug: 'mosaic-disease', categoryId: pestCategory?.id },
    { name: 'ナメクジ', slug: 'slug', categoryId: pestCategory?.id },
    { name: 'カイガラムシ', slug: 'scale-insect', categoryId: pestCategory?.id },
    { name: 'コナジラミ', slug: 'whitefly', categoryId: pestCategory?.id },
    { name: 'ネキリムシ', slug: 'cutworm', categoryId: pestCategory?.id },
    { name: '根腐れ', slug: 'root-rot', categoryId: pestCategory?.id },

    // 気候・季節カテゴリのタグ
    { name: '春野菜', slug: 'spring-vegetables', categoryId: seasonCategory?.id },
    { name: '夏野菜', slug: 'summer-vegetables', categoryId: seasonCategory?.id },
    { name: '秋野菜', slug: 'autumn-vegetables', categoryId: seasonCategory?.id },
    { name: '冬野菜', slug: 'winter-vegetables', categoryId: seasonCategory?.id },
    { name: '寒冷地', slug: 'cold-climate', categoryId: seasonCategory?.id },
    { name: '温暖地', slug: 'warm-climate', categoryId: seasonCategory?.id },
    { name: '雨季対策', slug: 'rainy-season', categoryId: seasonCategory?.id },
    { name: '乾燥対策', slug: 'drought-measures', categoryId: seasonCategory?.id },
    { name: '霜対策', slug: 'frost-protection', categoryId: seasonCategory?.id },
    { name: '台風対策', slug: 'typhoon-measures', categoryId: seasonCategory?.id },
    { name: '初心者向け', slug: 'beginner-friendly', categoryId: seasonCategory?.id },
    { name: '多年草', slug: 'perennial', categoryId: seasonCategory?.id },
    { name: '一年草', slug: 'annual', categoryId: seasonCategory?.id },]

  // タグの作成
  for (const tag of tags) {
    if (tag.categoryId) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: {
          name: tag.name,
          slug: tag.slug,
          categoryId: tag.categoryId,
        },
      })
    }
  }

  // eslint-disable-next-line no-console
  console.log('シードデータの投入が完了しました')
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('シードデータの投入中にエラーが発生しました:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
