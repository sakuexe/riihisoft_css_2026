{
  description = "Development flake for the Riihisoft CSS training day materials";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs =
    {
      self,
      nixpkgs,
    }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = false;
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs-slim_24
        ];

        shellHook = ''
          DEVSERVER_EXISTS="$(tmux list-windows | grep devserver)"
          if [[ ! $DEVSERVER_EXISTS ]]; then
            tmux new-window -n devserver \
              "nix develop --command zsh -ic 'vite; exec npm run dev'"
          fi
        '';
      };
    };
}
