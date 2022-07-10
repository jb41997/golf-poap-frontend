import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import Card from '../components/Card/Card'

afterEach(() => {
  cleanup()
})

test('should render card component', () => {
  const testProps = {
    tokenid: 'tokenid-1',
    id: '0',
    img: 'https://picsum.photos/200/200',
    name: 'test-image',
    end: '10-2022',
  }

  render(
    <Card
      tokenid={testProps.tokenid}
      id={testProps.id}
      img={testProps.img}
      name={testProps.name}
      end={testProps.end}
    />
  )
  const cardElement = screen.getByTestId(`card-${testProps.id}`)
  expect(cardElement).toBeInTheDocument()
  expect(cardElement).toHaveTextContent('test-image')
})

test('matches snapshot', () => {
  const testProps = {
    tokenid: 'tokenid-1',
    id: '0',
    img: 'https://picsum.photos/200/200',
    name: 'test-image',
    end: '10-2022',
  }

  const tree = renderer
    .create(
      <Card
        tokenid={testProps.tokenid}
        id={testProps.id}
        img={testProps.img}
        name={testProps.name}
        end={testProps.end}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
