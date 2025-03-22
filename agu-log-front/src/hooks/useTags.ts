import useSWR from 'swr'
import { API_ROUTES } from '@/constants/endpoint'
import { fetcher } from '@/lib/fetcher'
import { TagsResponse, CategoriesResponse } from '@/types/api/tags'

export function useTags() {
  const {
    data: tagsData,
    error: tagsError,
    isLoading: isTagsLoading,
  } = useSWR<TagsResponse>(API_ROUTES.TAGS, fetcher)

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useSWR<CategoriesResponse>(API_ROUTES.TAGS_CATEGORIES, fetcher)

  return {
    tags: tagsData?.tags || [],
    categories: categoriesData?.categories || [],
    isLoading: isTagsLoading || isCategoriesLoading,
    isError: !!tagsError || !!categoriesError,
    tagsError,
    categoriesError,
  }
}
