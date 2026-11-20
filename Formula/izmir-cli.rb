class IzmirCli < Formula
  desc "Izmir Buyuksehir Belediyesi Acik Veri Portali CLI Araci"
  homepage "https://github.com/AtaCanYmc/izmir-open-data-js"
  url "https://registry.npmjs.org/izmir-open-data-js/-/izmir-open-data-js-2.0.0.tgz"
  sha256 "80652959104a6941d2b736c44902c959ece23a952af6bfbbda9a39e29996df41"
  license "Apache-2.0"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink Dir["#{libexec}/bin/*"]
    bin.install_symlink "#{libexec}/bin/izmir-cli" => "izmir"
  end

  test do
    assert_match "Izmir Open Data CLI", shell_output("#{bin}/izmir-cli --help")
    assert_match "Izmir Open Data CLI", shell_output("#{bin}/izmir --help")
  end
end
