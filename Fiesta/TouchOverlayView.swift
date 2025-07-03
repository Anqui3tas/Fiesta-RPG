//
//  TouchOverlayView.swift
//  Fiesta
//
//  Created by Quentin on 7/3/25.
//

import UIKit
import WebKit

class TouchOverlayView: UIView {

    weak var webView: WKWebView?

    private var buttonContainer: UIView!
    private var fadeOutTimer: Timer?

    private let buttonSize: CGFloat = 60
    private let spacing: CGFloat = 10

    private var upButton: UIButton!
    private var downButton: UIButton!
    private var leftButton: UIButton!
    private var rightButton: UIButton!

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupButtons()
        setupGesture()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupButtons()
        setupGesture()
    }

    private func setupButtons() {
        isUserInteractionEnabled = true
        backgroundColor = .clear

        buttonContainer = UIView()
        buttonContainer.alpha = 0
        addSubview(buttonContainer)

        upButton = createButton()
        downButton = createButton()
        leftButton = createButton()
        rightButton = createButton()

        buttonContainer.addSubview(upButton)
        buttonContainer.addSubview(downButton)
        buttonContainer.addSubview(leftButton)
        buttonContainer.addSubview(rightButton)

        positionButtons()
        bindButtonActions()
    }

    private func createButton() -> UIButton {
        let button = UIButton(type: .custom)
        button.backgroundColor = UIColor.white.withAlphaComponent(0.2)
        button.layer.cornerRadius = buttonSize / 2
        button.layer.borderColor = UIColor.white.cgColor
        button.layer.borderWidth = 1
        return button
    }

    private func positionButtons() {
        buttonContainer.frame = CGRect(x: 30, y: bounds.height - 200, width: buttonSize * 3, height: buttonSize * 3)

        upButton.frame = CGRect(x: buttonSize, y: 0, width: buttonSize, height: buttonSize)
        downButton.frame = CGRect(x: buttonSize, y: buttonSize * 2, width: buttonSize, height: buttonSize)
        leftButton.frame = CGRect(x: 0, y: buttonSize, width: buttonSize, height: buttonSize)
        rightButton.frame = CGRect(x: buttonSize * 2, y: buttonSize, width: buttonSize, height: buttonSize)
    }

    private func bindButtonActions() {
        upButton.addTarget(self, action: #selector(moveUp), for: .touchDown)
        downButton.addTarget(self, action: #selector(moveDown), for: .touchDown)
        leftButton.addTarget(self, action: #selector(moveLeft), for: .touchDown)
        rightButton.addTarget(self, action: #selector(moveRight), for: .touchDown)
    }

    @objc private func moveUp() {
        sendInput("up")
    }

    @objc private func moveDown() {
        sendInput("down")
    }

    @objc private func moveLeft() {
        sendInput("left")
    }

    @objc private func moveRight() {
        sendInput("right")
    }

    private func sendInput(_ direction: String) {
        webView?.evaluateJavaScript("Input._currentState['\(direction)'] = true;")
        showButtons()
    }

    private func setupGesture() {
        let tap = UITapGestureRecognizer(target: self, action: #selector(userInteracted))
        self.addGestureRecognizer(tap)
    }

    @objc private func userInteracted() {
        showButtons()
    }

    private func showButtons() {
        fadeOutTimer?.invalidate()
        UIView.animate(withDuration: 0.3) {
            self.buttonContainer.alpha = 1.0
        }
        fadeOutTimer = Timer.scheduledTimer(timeInterval: 2.0, target: self, selector: #selector(hideButtons), userInfo: nil, repeats: false)
    }

    @objc private func hideButtons() {
        UIView.animate(withDuration: 0.5) {
            self.buttonContainer.alpha = 0.0
        }
    }
}

