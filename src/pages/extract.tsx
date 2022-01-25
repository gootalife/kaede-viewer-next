import { SearchResult } from 'components/SearchResult'
import Head from 'next/head'
import { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { ExtractResponse } from 'types/Response'

const getAnimationsByID = async (id: string) => {
  if (id === '') {
    return
  }
  const res = await fetch(`api/extract/${id}`)
  const animationsResponse = (await res.json()) as ExtractResponse
  if (animationsResponse.result.length <= 0) {
    alert(`'${id}' not exists`)
    return
  }
  const columns = ['#', 'Animation Name', 'Image', 'Flip Horizontal']
  const data = animationsResponse.result.map((elem, index) => [
    <>{index + 1}</>,
    <>{elem.animationName}</>,
    <img src={`data:image/png;base64,${elem.imageStr}`} alt={elem.animationName} />,
    <img src={`data:image/png;base64,${elem.imageStr}`} alt={elem.animationName} style={{ transform: 'scale(-1, 1)' }} />
  ])
  return { columns: columns, data: data }
}

const placeholder = '1210102'

const Extract = () => {
  const [inputVal, setInputVal] = useState('')
  const [result, setResult] = useState<{
    columns: string[]
    data: JSX.Element[][]
  }>()
  const [isRunning, setIsRunning] = useState(false)

  return (
    <>
      <Head>
        <title>Extract - Kaede-Viewer</title>
      </Head>
      <Container>
        <h1>Extract Animations</h1>
        <Row>
          <Col xs="auto">
            <InputGroup className="sm-2">
              <Form.Control
                type="text"
                id="id-text"
                placeholder={placeholder}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    try {
                      setIsRunning(true)
                      setResult(await getAnimationsByID(inputVal))
                    } catch {
                      alert('データ取得に失敗しました。')
                      setResult({ columns: [], data: [[]] })
                    } finally {
                      setIsRunning(false)
                    }
                  }
                }}
              />
              <Button
                variant="secondary"
                disabled={isRunning}
                onClick={async (e) => {
                  e.currentTarget.blur()
                  setIsRunning(true)
                  try {
                    setIsRunning(true)
                    setResult(await getAnimationsByID(inputVal))
                  } catch {
                    alert('データ取得に失敗しました。')
                    setResult({ columns: [], data: [[]] })
                  } finally {
                    setIsRunning(false)
                  }
                }}
              >
                {isRunning ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <>Search</>}
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="auto">
            {result && (
              <>
                <h3 className="pt-4">Result</h3>
                {`${result.data.length} element(s) hit.`}
                <SearchResult columns={result.columns} data={result.data} />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Extract
