const targetBlank = () => {
  return (
    <>
      <div style={{ marginTop: '24px' }}>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href="https://google.com" target="_blank">
          target=&ldquo;_blank&ldquo;のリンク
        </a>
      </div>
      <div style={{ marginTop: '24px' }}>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          target=&ldquo;_blank&ldquo;のリンク （noopener noreferrer付き）
        </a>
      </div>
    </>
  )
}

export default targetBlank
