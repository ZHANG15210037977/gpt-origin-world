import { createParser } from 'eventsource-parser'

export const gpt = async (promot: string): Promise<string | null> => {
  const response = await fetch('https://openai.158745.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `${promot}`,
        },
      ],
    }),
  })
  const res = await response.json()
  if (res?.choices?.[0]?.message?.content) {
    return res?.choices?.[0]?.message?.content
  } else {
    return null
  }
}

export const gptStream = (promot: string, cb: (text: string) => any) => {
  let gptText = ''
  fetch('https://openai.158745.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'user',
          content: `${promot}`,
        },
      ],
    }),
  }).then(async (response) => {
    if (response && response.body) {
      const decoder = new TextDecoder()
      function onParse(event: any) {
        // sse 数据解析函数
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            if (text !== undefined) {
              gptText += text
              cb && cb(gptText)
            }
            return text
          } catch (e) {
            console.error
          }
        }
      }
      // 获取可读取流
      const streamReader = response.body.getReader()
      const parser = createParser(onParse)
      // 监听可读取流
      while (true) {
        const { done, value } = await streamReader.read()
        if (done) {
          // 流式数据读取完毕 or 弹窗关闭退出循环
          break
        }
        const decodedValue = decoder.decode(value, { stream: true })
        parser.feed(decodedValue)
      }
    }
  })
}