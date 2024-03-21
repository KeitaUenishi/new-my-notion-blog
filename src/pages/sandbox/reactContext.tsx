import React, { useState } from "react";
import { Button } from "@mui/material";

import { useUi } from "@/hooks/useUi";
import Prism from "prismjs";
import styles from "@/styles/notion-block.module.css";

const ReactContext = () => {
  const ui = useUi();
  const [users, setUsers] = useState([]);
  const onClick = () => {
    ui.loadingScreen.showWhile(async () => {
      const res = await fetch("/api/dummy");
      const json = await res.json();
      setUsers(json);
    });
  };

  return (
    <div>
      <p>React Contextで共通のローディング処理を作成</p>
      <Button variant="contained" onClick={onClick}>
        フェッチする
      </Button>
      <Button style={{ marginLeft: "16px" }} variant="contained" color="error" onClick={() => setUsers([])}>
        クリア
      </Button>
      {users.map((u) => {
        return (
          <div key={u.id}>
            <p>{u.name}</p>
          </div>
        );
      })}
      <p style={{ marginTop: "96px" }}>LoadingScreen コンポーネントを定義</p>
      <div className={styles.code}>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(loadingScreenSource, Prism.languages.javascript, "javascript"),
            }}
          />
        </pre>
      </div>
      <p>emptyActionsを定義します</p>
      <div className={styles.code}>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(emptyActionsSource, Prism.languages.javascript, "javascript"),
            }}
          />
        </pre>
      </div>
      <p>uiContextを定義します</p>
      <div className={styles.code}>
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(uiContextSource, Prism.languages.javascript, "javascript"),
            }}
          />
        </pre>
        <p>useUiを定義します</p>
        <div className={styles.code}>
          <pre>
            <code
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(useUiSource, Prism.languages.javascript, "javascript"),
              }}
            />
          </pre>
        </div>
        <p>uiProviderを定義します</p>
        <div className={styles.code}>
          <pre>
            <code
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(uiProviderSource, Prism.languages.javascript, "javascript"),
              }}
            />
          </pre>
        </div>
        <p>uiProviderを_app.tsxに置いて、完成！</p>
      </div>
    </div>
  );
};

export default ReactContext;

const loadingScreenSource = `
import React, { useState } from 'react'

import { useUi } from '@/hooks/useUi'
import { Box, CircularProgress } from '@mui/material'

export const LoadingScreen: React.FC = () => {
  const ui = useUi()
  const [visible, setVisible] = useState(false)

  const processingTasks: Set<() => Promise<void>> = new Set()

  ui.loadingScreen.showWhile = async (
    callback: () => Promise<void>
  ): Promise<void> => {
    processingTasks.add(callback)
    try {
      setVisible(true)
      await callback()
    } catch (error) {
      throw error
    } finally {
      processingTasks.delete(callback)
      if (processingTasks.size === 0) {
        setVisible(false)
      }
    }
  }

  ui.loadingScreen.show = (): void => {
    setVisible(true)
  }

  ui.loadingScreen.close = (): void => {
    setVisible(false)
  }

  if (!visible) {
    return <></>
  }

  return (
    <div
      style={{
        background: 'rgba(20, 20, 20, 0.5)',
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        zIndex: '2000',
      }}
    >
      <br />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress size={64} />
      </Box>
    </div>
  )
}
`;

const emptyActionsSource = `
export type Actions = {
  show: () => void
  showWhile: (callback: () => Promise<void>) => Promise<void>
  close: () => void
}

export const emptyActions = {
  show(): void {
    // No operation function for context initialization.
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async showWhile(_callback: () => Promise<void>): Promise<void> {
    // No operation function for context initialization.
  },
  close(): void {
    // No operation function for context initialization.
  },
}
`;

const useUiSource = `
import { useContext } from 'react'

import { Ui, UiContext } from '@/hooks/uiContext'

export const useUi = (): Ui => {
  return useContext(UiContext)
}
`;

const uiContextSource = `
import { createContext } from 'react'

import { emptyActions, Actions } from './emptyActions'

export type Ui = {
  loadingScreen: Actions
}

const ui = {
  loadingScreen: emptyActions,
}

export const UiContext = createContext<Ui>(ui)
`;

const uiProviderSource = `
import React, { ReactNode } from 'react'

import { LoadingScreen } from '@/components/base/LoadingScreen'
import { emptyActions } from '@/hooks/emptyActions'
import { UiContext } from '@/hooks/uiContext'

const ui = {
  loadingScreen: emptyActions,
}

export const UiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UiContext.Provider value={ui}>
      {children}
      <LoadingScreen />
    </UiContext.Provider>
  )
}

`;
