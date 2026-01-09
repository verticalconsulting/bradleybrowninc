import React, { useEffect } from "react"
import { navigate } from "gatsby"

const QuotePage = () => {
  useEffect(() => {
    // Redirect to home page with #quote anchor
    navigate("/#quote", { replace: true })
  }, [])

  // Show a loading message while redirecting
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "sans-serif"
    }}>
      <p>Redirecting to quote form...</p>
    </div>
  )
}

export default QuotePage
