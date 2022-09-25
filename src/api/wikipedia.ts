import axios from "axios"
import { useQuery } from "react-query"

export function useWikipediaAPI(key: string, params: Record<string, string>) {
  return useQuery(`wikipedia-${key}`, () => (
    axios.get(`https://ja.wikipedia.org/w/api.php`, {
      params: {
        format: "json",
        origin: "*",
        ...params
      }
    })
  ))
}

export function useWikipediaLeadText(title: string, options?: any) {
  const res = useWikipediaAPI(title, {
    action: "query",
    prop: "extracts",
    exintro: "",
    explaintext: "",
    titles: title,
  })

  let data: string | undefined = undefined
  if (res.data?.data) {
    const id = Object.keys(res.data.data.query.pages)[0]
    const page = res.data.data.query.pages[id ?? 0]
    data = page?.extract
  }

  return [data, res] as const
}