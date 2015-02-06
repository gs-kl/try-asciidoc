class AsciidoctorController < ApplicationController
  def parse
    input = params[:input]
    document = Asciidoctor.load input, header_footer: false, safe: "safe"
    render json: {parsed: document.convert}
  end
end
