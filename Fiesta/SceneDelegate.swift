//
//  SceneDelegate.swift
//  Fiesta
//
//  Created by Quentin on 7/3/25.
//


import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = (scene as? UIWindowScene) else { return }

        let window = UIWindow(windowScene: windowScene)
        window.rootViewController = GameViewController() // Replace with your entry point
        self.window = window
        window.makeKeyAndVisible()
    }
}