const Main = ({ children }) => {
  return (
    <main className="app-main">
      <div className="app-main-wrapper">
        {children}
      </div>
    </main>
  )
};

export default Main;