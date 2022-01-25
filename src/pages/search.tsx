import { useState } from 'react'
import { Button, ButtonGroup, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import { NameResponse, IdsResponse } from 'types/Response'
import { SearchResult } from 'components/SearchResult'
import Head from 'next/head'

const getNameById = async (id: string) => {
  if (id === '') {
    return
  }
  const res = await fetch(`/api/name/${id}`)
  const nameResponse = (await res.json()) as NameResponse
  if (!nameResponse.result) {
    alert(`'${id}' is not found`)
    return
  }
  const columns = ['#', 'ID', 'Name']
  const data = [[<>{1}</>, <>{nameResponse.result.id}</>, <>{nameResponse.result.name}</>]]
  return { columns: columns, data: data }
}

const getIdsByPartialName = async (name: string) => {
  if (name === '') {
    return
  }
  const res = await fetch(`/api/ids/${name}`)
  const idsResponse = (await res.json()) as IdsResponse
  if (idsResponse.result.length <= 0) {
    alert(`'${name}' is not found`)
    return
  }
  const columns = ['#', 'Name', 'IDs']
  const data = idsResponse.result.map((elem, index) => [
    <>{index + 1}</>,
    <>{elem.name}</>,
    <>
      {elem.ids.map((id) => (
        <div key={`id_${id}`}>
          {id}
          <br />
        </div>
      ))}
    </>
  ])
  return { columns: columns, data: data }
}

const radios = [
  {
    name: 'by Name',
    value: '0',
    placeholder: 'メイプルキノコ',
    searchFunc: getIdsByPartialName
  },
  {
    name: 'by ID',
    value: '1',
    placeholder: '1210102',
    searchFunc: getNameById
  }
]

const Search = () => {
  const [inputVal, setInputVal] = useState('')
  const [radioVal, setRadioVal] = useState('0')
  const [placeholder, setPlaceholder] = useState(radios[Number(radioVal)].placeholder)
  const [result, setResult] = useState<{ columns: string[]; data: JSX.Element[][] }>()
  const [isRunning, setIsRunning] = useState(false)

  return (
    <>
      <Head>
        <title>Search - Kaede-Viewer</title>
      </Head>
      <Container>
        <h1>Search</h1>
        <Row>
          <Col xs="auto">
            <ButtonGroup className="pb-2">
              {radios.map((radio, index) => (
                <Button
                  key={index}
                  id={`radio-${index}`}
                  variant={radioVal === radio.value ? 'secondary' : 'outline-secondary'}
                  value={radio.value}
                  size="sm"
                  onClick={(e) => {
                    e.currentTarget.blur()
                    setRadioVal(radio.value)
                    setPlaceholder(radio.placeholder)
                    setResult(undefined)
                  }}
                >
                  {radio.name}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>

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
                    setIsRunning(true)
                    try {
                      setResult(await radios[Number(radioVal)].searchFunc(inputVal))
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
                    setResult(await radios[Number(radioVal)].searchFunc(inputVal))
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
                {`${result.data.length - 1} element(s) hit.`}
                <SearchResult columns={result.columns} data={result.data} />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Search
