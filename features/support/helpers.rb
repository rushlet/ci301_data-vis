def scroll_to(element)
  script = <<-JS
    arguments[0].scrollIntoView(true);
  JS
  Capybara.current_session.driver.browser.execute_script(script, element.native)
end

def computed_style(selector)
  page.evaluate_script(
    "window.getComputedStyle(document.querySelector('#{selector}'))"
  )
end
