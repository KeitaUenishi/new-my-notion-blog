import Prism from "prismjs";
import { useRef } from "react";

import styles from "@/styles/notion-block.module.css";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const sourceRef = useRef(null);

  function scrollToId(itemId: number) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function scrollToSource() {
    sourceRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <div>
          <button onClick={() => scrollToId(4)}>id: 4</button>
          <button onClick={() => scrollToId(8)}>id: 8</button>
          <button onClick={() => scrollToId(12)}>id: 12</button>
          <button onClick={() => scrollToSource()}>source code</button>
        </div>
      </nav>
      <div>
        <ul style={{ gap: "8px" }}>
          {catList.map((cat) => (
            <li
              style={{ listStyle: "none" }}
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            >
              <div>{`id: ${cat.id}`}</div>
              <img src={cat.imageUrl} alt={"Cat #" + cat.id} />
            </li>
          ))}
        </ul>
      </div>
      <p style={{ marginTop: "96px" }}>ソースコード</p>
      <div className={styles.code} ref={sourceRef}>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(refSource, Prism.languages.javascript, "javascript"),
            }}
          />
        </pre>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 20; i++) {
  catList.push({
    id: i,
    imageUrl: "https://placekitten.com/250/200?image=" + i,
  });
}

const refSource = `
import { useRef } from 'react'
import Prism from 'prismjs'
import styles from '@/styles/notion-block.module.css'

export default function CatFriends() {
  const itemsRef = useRef(null)

  function scrollToId(itemId: number) {
    const map = getMap()
    const node = map.get(itemId)
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }

  return (
    <>
      <nav>
        <div>
          <button onClick={() => scrollToId(4)}>id: 4</button>
          <button onClick={() => scrollToId(8)}>id: 8</button>
          <button onClick={() => scrollToId(12)}>id: 12</button>
        </div>
      </nav>
      <div>
        <ul style={{ gap: '8px' }}>
          {catList.map((cat) => (
            <li
              style={{ listStyle: 'none' }}
              key={cat.id}
              ref={(node) => {
                const map = getMap()
                if (node) {
                  map.set(cat.id, node)
                } else {
                  map.delete(cat.id)
                }
              }}
            >
              <div>{"id: " + cat.id}</div>
              <img src={cat.imageUrl} alt={'Cat #' + cat.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const catList = []
for (let i = 0; i < 20; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i,
  })
}
`;
